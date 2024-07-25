import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @ManyToOne(() => User, () => Category, {lazy: true})
  @JoinColumn({ name: "user_id" })
  user: User;
}