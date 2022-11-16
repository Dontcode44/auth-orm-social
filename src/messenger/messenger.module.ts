import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { MessengerController } from './messenger.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Messenger } from './entities/messenger.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Messenger])],
  controllers: [MessengerController],
  providers: [MessengerService]
})
export class MessengerModule {}
