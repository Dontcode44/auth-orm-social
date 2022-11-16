import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import {
  ACGuard,
  InjectRolesBuilder,
  RolesBuilder,
  UseRoles,
} from 'nest-access-control';
import { AppResources } from 'src/app.roles';
import { User } from 'src/auth/entities/user.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserD } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<User | undefined> {
    return this.usersService.findOn(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async deleteUser(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    possession: 'own',
    action: 'update',
    resource: AppResources.USER,
  })
  @Patch(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: UpdateUserDto,
    @UserD() userD: User,
  ) {
    let data;

    if (this.rolesBuilder
      .can(userD.roles)
      .updateAny(AppResources.USER)
      .granted
      ) {
      data = await this.usersService.updateUser(id, user);
    } else {
      const { roles, ...rest } = user;
      data = await this.usersService.updateUser(id, user, userD);
    }
    return {
      message: 'User updated',
    };
  }
}
