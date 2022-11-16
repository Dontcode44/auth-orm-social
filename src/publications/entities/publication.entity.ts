import { Profile } from "src/profiles/entities/profile.entity";
import { Column, Entity, Index, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Publication {
  @PrimaryGeneratedColumn('identity')
  id: string;

  @Index({})
  @Column()
  title: string;

  @Column()
  description: string;

  @Column({'default': '0'})
  likes: number;

  @ManyToOne(() => Profile, (profile) => profile.publications)
  author: Profile;

  @Column({"type": "simple-array"})
  privacity: string[];
}
