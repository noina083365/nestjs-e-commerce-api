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

	@Column({ type: 'decimal', precision: 10, scale: 2 })
	total_price: number;

	@Column({ nullable: false })
	status: string; // e.g., 'Open', 'Checkout'

	@OneToMany(() => CartItem, (cartItem) => cartItem.cart, { cascade: true })
	items: CartItem[];

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
