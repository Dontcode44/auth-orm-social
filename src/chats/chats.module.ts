import { Module } from '@nestjs/common';
import { ChatsService } from './chats.service';
import { ChatsController } from './chats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chats } from './entities/chats.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chats])],
  controllers: [ChatsController],
  providers: [ChatsService]
})
export class ChatsModule {}
