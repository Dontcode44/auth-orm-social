import { IsAlpha } from 'class-validator';
import { User } from 'src/auth/entities/user.entity';
import { Friends } from 'src/friends/entities/friends.entity';
import { Messenger } from 'src/messenger/entities/messenger.entity';
import { Publication } from 'src/publications/entities/publication.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsAlpha()
  name: string;

  @Column()
  @IsAlpha()
  lastname: string;

  @Column({ type: 'timestamp' })
  birthdate: Date;

  @OneToOne(() => User, (user) => user.profile)
  user: User;

  @OneToMany(() => Publication, (publication) => publication.author)
  publications: Publication[];

  @OneToOne(() => Messenger, (messenger) => messenger.profile)
  @JoinColumn({ name: 'messenger_id' })
  messenger: Messenger;

  @OneToMany(() => Friends, (friends) => friends.currentProfile)
  friends: Friends[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
