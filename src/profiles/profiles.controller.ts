import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';
import { QueryProductDto } from './dto/query-product.dto';
import { FilterNameLastnameDto } from './dto/filter-name.dto';

@Controller('profiles')
export class ProfilesController {
  constructor(private readonly profilesService: ProfilesService) {}

  @Post()
  create(
    @Body() createProfileDto: CreateProfileDto,
  ): Promise<CreateProfileDto> {
    return this.profilesService.create(createProfileDto);
  }

  @Get()
  async someNames(
    @Query(new ValidationPipe()) query: QueryProductDto,
  ): Promise<Profile[]> {
    const mergedQuery = {
      limit: 5,
      order: 'name',
      name: '',
      ...query,
    };
    return this.profilesService.getFilterName(mergedQuery);
  }
  @Get('names')
  async getNameLastname(
    @Query(new ValidationPipe()) query: FilterNameLastnameDto,
  ): Promise<Profile[]> {
    return this.profilesService.nameLastName(query);
  }

  @Get('name')
  findByName(@Query('name') name: string): Promise<Profile[]> {
    return this.profilesService.findByName(name);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProfileDto: UpdateProfileDto) {
    return this.profilesService.updateUser(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    this.profilesService.remove(id);
    return;
  }
}
