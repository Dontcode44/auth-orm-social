import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateProfileDto } from './dto/create-profile.dto';
import { FilterNameLastnameDto } from './dto/filter-name.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entities/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepo: Repository<Profile>,
  ) {}
  create(profile: CreateProfileDto): Promise<CreateProfileDto> {
    return this.profileRepo.save(profile);
  }

  getFilterName(query: QueryProductDto): Promise<Profile[]> {
    return this.profileRepo.find({
      select: ['name', 'lastname', 'birthdate'],
      take: query.limit,
      where: {
        name: Like(`%${query.name}%`),
      },
      order: {
        [query.order]: 'ASC',
      },
    });
  }

  async findByName(name?: string): Promise<Profile[]> {
    const foundName = await this.profileRepo.find({
      where: {
        name,
      },
    });
    if (!foundName) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    return foundName;
  }

  async updateUser(id: string, updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileRepo.find({
      where: {
        id,
      },
    });
    if (!profile) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    const toUpdate = await this.profileRepo.update(id, updateProfileDto);
    if (toUpdate.affected === 0) {
      throw new HttpException('Profile not updated', HttpStatus.NOT_MODIFIED);
    }
    return toUpdate;
  }

  remove(id: string) {
    const toDelete = this.profileRepo.find({
      where: {
        id,
      },
    });
    if (!toDelete) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    return this.profileRepo.delete(id);
  }

  async nameLastName(
    filterNameLastnameDto: FilterNameLastnameDto,
  ): Promise<Profile[]> {
    const foundName = await this.profileRepo.find({
      select: ['name', 'lastname'],
      where: {
        name: Like(`%${filterNameLastnameDto.name}%`),
        lastname: Like(`%${filterNameLastnameDto.lastname}%`),
      },
    });
    if (!foundName) {
      throw new HttpException('Profile not found', HttpStatus.NOT_FOUND);
    }
    return foundName;
  }
}
