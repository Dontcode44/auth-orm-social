import { Messenger } from 'src/messenger/entities/messenger.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Chats {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'simple-array' })
  users: string[];

  @Column({ type: 'simple-array' })
  messages: string[];

  @OneToMany(() => Messenger, (messenger) => messenger.conversations)
  messenger: Messenger;
}
