import { Customer } from '../../customers/entities/customer.entity';
import { OrderItem } from '../../order-item/entities/order-item.entity';
import {
	Column,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Customer, (customer) => customer.orders, { eager: true })
	customer: Customer;

	@Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
	total_price: number;

	@Column({ nullable: false })
	status: string; // e.g., 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'

	@OneToMany(() => OrderItem, (orderItem) => orderItem.order, { onDelete: 'CASCADE' })
	items: OrderItem[];

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@Column({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	})
	updatedAt: Date;
}
