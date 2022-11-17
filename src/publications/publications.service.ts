import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Equal, LessThanOrEqual, Like, MoreThan, Repository } from 'typeorm';
import { CreatePublicationDto } from './dto/create-publication.dto';
import { UpdatePublicationDto } from './dto/update-publication.dto';
import { Publication } from './entities/publication.entity';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepo: Repository<Publication>,
  ) {}

  async update(id: string, publication: UpdatePublicationDto) {
    const prublicationToSave = {
      id,
      ...publication,
    };
    const toPublicate = await this.publicationRepo.preload(prublicationToSave);
    if (!toPublicate) {
      throw new Error('Publication not found');
    }
    return this.publicationRepo.save(toPublicate);
  }

  findAll() {
    return `This action returns all publications`;
  }

  findOne(id: string): Promise<Publication> {
    const foundPublication = this.publicationRepo.findOne({
      where: {
        id,
      },
    });
    if (!foundPublication) {
      throw new Error('Publication not found');
    }
    return foundPublication;
  }

  async remove(id: string) {
    const publicationDelete = await this.publicationRepo.findOne({
      where: {
        id,
      },
    });
    if (!publicationDelete) {
      throw new Error('Publication not found');
    }
    return this.publicationRepo.remove(publicationDelete);
  }

  create(createPublicationDto: CreatePublicationDto, userd: User) {
    const { id } = userd;
    if (!id) {
      throw new Error('User not found');
    }
    if (id !== userd.id) {
      throw new HttpException(
        'You are not authorized to create a publication for this user',
        HttpStatus.UNAUTHORIZED,
      );
    }
    const publication = this.publicationRepo.create(createPublicationDto);
    return this.publicationRepo.save(publication);
  }

  searchTitle(title: string) {
    const foundTitle = this.publicationRepo.find({
      where: {
        title: title,
      },
      relations: {
        author: true,
      },
    });
  }

  searchLikes(likes: number) {
    const likesFound = this.publicationRepo.find({
      where: {
        likes: LessThanOrEqual(10),
      },
    });
    if (!likesFound) {
      throw new Error('Publication not found');
    }
    return likesFound;
  }

  searchMoreLikes(likes: number) {
    const likesFound = this.publicationRepo.find({
      where: {
        likes: MoreThan(10),
      },
    });
    if (!likesFound) {
      throw new Error('Publication not found');
    }
    return likesFound;
  }

  searchPost(post: string) {
    const postFound = this.publicationRepo.find({
      where: {
        title: Equal(post),
      },
    });
    if (!postFound) {
      throw new Error('Publication not found');
    }
    return postFound;
  }

  searchBeggining(post: string) {
    const postFound = this.publicationRepo.findBy({
      title: Like('%' + post + '%'),
    });
    if (!postFound) {
      throw new Error('Publication not found');
    }
    return postFound;
  }
}
