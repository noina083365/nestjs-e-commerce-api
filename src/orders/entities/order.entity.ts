import { Customer } from '../../customers/entities/customer.entity';
import { OrderItem } from '../../order-item/entities/order-item.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: false })
	status: string; // e.g., 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'

	@Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
	totalAmount: number;

	@ManyToOne(() => Customer, (customer) => customer.orders, { eager: true })
	customer: Customer;

	@OneToMany(() => OrderItem, (orderItem) => orderItem.order, { onDelete: 'CASCADE' })
	items: OrderItem[];

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
	createdAt: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
		onUpdate: 'CURRENT_TIMESTAMP(6)',
	})
	updatedAt: Date;
}
