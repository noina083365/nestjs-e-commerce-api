import { Cart } from 'src/carts/entities/cart.entity';
import { Customer } from 'src/customers/entities/customer.entity';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
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
