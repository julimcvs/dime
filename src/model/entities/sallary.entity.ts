import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity("sallary")
export class Sallary {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sallary: number;

  @ManyToOne(() => User, () => Sallary, {lazy: true})
  @JoinColumn({ name: "user_id" })
  user: User;
}