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
	id: number;

	@ManyToOne(() => Cart, (cart) => cart.items)
	cart: Cart; // cart_id

	@ManyToOne(() => Product, { eager: true })
	product: Product; // product_id

	@Column()
	quantity: number;

	@Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
	price: number; // Price per unit

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;
}
