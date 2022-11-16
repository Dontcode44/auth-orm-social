import { Profile } from 'src/profiles/entities/profile.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Friends {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'all_friends', type: 'simple-array' })
  allFriends: string[];

  @Column({ name: 'pending_friends', type: 'simple-array' })
  pendingFriends: string[];

  @Column({ name: 'friend_requests', type: 'simple-array' })
  friendRequests: string[];

  @ManyToOne(() => Profile, (profile) => profile.friends)
  currentProfile: Profile;
}
