import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Bill } from './bill.entity';

@Entity("bill_history")
export class BillHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  month: number;

  @Column({ type: "int" })
  year: number;

  @Column({ type: "numeric" })
  price: number;

  @ManyToOne(() => Bill, bill => bill.billHistories)
  @JoinColumn({ name: "bill_id" })
  bill: Bill;
}