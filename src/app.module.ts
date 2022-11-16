import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PublicationsModule } from './publications/publications.module';
import { UsersModule } from './users/users.module';
import { AccessControlModule } from "nest-access-control";
import { roles } from './app.roles';
import { MessengerModule } from './messenger/messenger.module';
import { ChatsModule } from './chats/chats.module';
import { FriendsModule } from './friends/friends.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 5440,
        username: 'post',
        password: 'facebook',
        database: 'postgres_db',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
    AccessControlModule.forRoles(roles),
    AuthModule,
    ProfilesModule,
    PublicationsModule,
    UsersModule,
    MessengerModule,
    ChatsModule,
    FriendsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
