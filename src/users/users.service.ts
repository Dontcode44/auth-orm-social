import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findOn(id: string, userEntity?: User): Promise<User | undefined> {
    const user = this.userRepo.findOne({
      where: {
        id,
      },
    });
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (userEntity) {
      if (userEntity.id !== id) {
        throw new HttpException(
          'You are not authorized to access this resource',
          HttpStatus.UNAUTHORIZED,
        );
      }
      return user;
    }
  }

  async deleteUser(id: string, userEntity?: User) {
    const userFound = await this.findOn(id, userEntity);
    userFound.active = false;
    const toDelete = await this.userRepo.update(id, userFound);
    if (toDelete.affected === 0) {
      throw new HttpException('User not deleted', HttpStatus.NOT_MODIFIED);
    }
    return toDelete;
  }

  async updateUser(id: string, user: UpdateUserDto, userEntity?: User) {
    const userFound = await this.findOn(id, userEntity);
    if (!userFound) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const toUpdate = await this.userRepo.update(id, user);
    if (toUpdate.affected === 0) {
      throw new HttpException('User not updated', HttpStatus.NOT_MODIFIED);
    }
    return toUpdate;
  }
}
