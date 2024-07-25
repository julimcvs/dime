import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BillHistory } from './bill-history.entity';
import { User } from './user.entity';

@Entity("bills")
export class Bill {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  description: string;

  @Column({ type: "numeric" })
  price: number;

  @Column({ type: "int" })
  recurrentPaymentDay: number;

  @Column({ type: "boolean" })
  sendNotification: boolean;

  @Column({ type: "boolean" })
  isFixedPrice: boolean;

  @Column({ type: "boolean" })
  isDeleted: boolean;

  @OneToMany(() => BillHistory, billHistory => billHistory.bill)
  billHistories: BillHistory[];

  @ManyToOne(() => User, () => Bill, {lazy: true})
  @JoinColumn({ name: "user_id" })
  user: User;
}