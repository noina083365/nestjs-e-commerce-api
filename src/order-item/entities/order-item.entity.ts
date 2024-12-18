import { Order } from '../../orders/entities/order.entity';
import { Product } from '../../products/entities/product.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order_items')
export class OrderItem {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Order, (order) => order.items)
	order: Order; // order_id

	@ManyToOne(() => Product, { eager: true })
	product: Product; // product_id

	@Column()
	quantity: number;

	@Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
	price: number; // Price per unit

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
	createdAt: Date;
}
