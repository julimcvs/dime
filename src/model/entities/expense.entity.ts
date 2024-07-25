import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './category.entity';
import { User } from './user.entity';

@Entity('expenses')
export class Expense {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  description: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'timestamp' })
  paymentDay: Date;

  @Column({ type: 'boolean' })
  isDeleted: boolean;

  @ManyToOne(() => Category, () => Category, { lazy: true })
  @JoinColumn({ name: 'categoryId' })
  category: Category;

  @ManyToOne(() => User, () => Expense, {lazy: true})
  @JoinColumn({ name: "user_id" })
  user: User;
}