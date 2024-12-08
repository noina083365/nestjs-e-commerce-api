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
	cart_id: number;

	@ManyToOne(() => Customer, { eager: true })
	customer: Customer; // customer_id

	@Column({ nullable: false })
	status: string; // e.g., 'Open', 'Checkout'

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
