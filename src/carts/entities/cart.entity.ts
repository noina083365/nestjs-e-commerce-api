import { CartItem } from '../../cart-item/entities/cart-item.entity';
import { Customer } from '../../customers/entities/customer.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

@Entity('carts')
export class Cart {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Customer, { eager: true })
	customer: Customer; // customer_id

	@Column({ type: 'decimal', precision: 10, scale: 2, default: 0.0 })
	total_price: number;

	@Column({ nullable: false })
	status: string; // e.g., 'Open', 'Checkout'

	@OneToMany(() => CartItem, (cartItem) => cartItem.cart, { onDelete: 'CASCADE' })
	items: CartItem[];

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
