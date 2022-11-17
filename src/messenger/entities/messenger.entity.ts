import { Chats } from 'src/chats/entities/chats.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Messenger {
  @PrimaryGeneratedColumn('identity')
  id: string;

  @Column({ type: 'simple-array' })
  chats: string[];

  @OneToOne(() => Profile, (profile) => profile.messenger)
  profile: Profile;

  @ManyToOne(() => Chats, (chats) => chats.messenger)
  conversations: Chats;

}
