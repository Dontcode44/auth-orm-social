import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Publication } from './entities/publication.entity';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserD } from 'src/users/decorators/user.decorator';
import { User } from 'src/auth/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Publication Routes')
@Controller('publications')
export class PublicationsController {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Get()
  findAll() {
    return this.publicationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Publication> {
    return this.publicationsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  toUpdate(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() createPublicationDto: UpdatePublicationDto,
  ) {
    return this.publicationsService.update(id, createPublicationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createPublicationDto: CreatePublicationDto,
    @UserD() user: User,
  ) {
    const publication = this.publicationsService.create(
      createPublicationDto,
      user,
    );
    return publication;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.publicationsService.remove(id);
  }
}
