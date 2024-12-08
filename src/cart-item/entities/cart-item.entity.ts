import { Cart } from '../../carts/entities/cart.entity';
import { Product } from '../../products/entities/product.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('cart_items')
export class CartItem {
	@PrimaryGeneratedColumn()
	cart_item_id: number;

	@ManyToOne(() => Cart, { eager: true })
	cart: Cart; // cart_id

	@ManyToOne(() => Product, { eager: true })
	product: Product; // product_id

	@Column()
	quantity: number;

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	price: number; // Price per unit

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	total_price: number;

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP(6)',
	})
	createdAt: Date;
}
