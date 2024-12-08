import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import {
	Column,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order_items')
export class OrderItem {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Order, (order) => order.items, { onDelete: 'CASCADE' })
	order: Order;

	@ManyToOne(() => Product, { eager: true })
	product: Product;

	@Column()
	quantity: number;

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	price: number; // Price per unit
}
