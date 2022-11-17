import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Chats } from './entities/chats.entity';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chats) private readonly chatsRepository: Repository<Chats>,
  ) {}

    async filterByWord(msg: string) {
      return await this.chatsRepository.findBy({
        messages: Like(`%${msg}%`),
      });
    }
  }

