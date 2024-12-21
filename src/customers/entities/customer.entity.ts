import { ActiveStatus } from '../../common/interfaces';
import { Order } from '../../orders/entities/order.entity';
import {
	Entity,
	Column,
	PrimaryGeneratedColumn,
	CreateDateColumn,
	UpdateDateColumn,
	OneToMany,
} from 'typeorm';

@Entity('customers')
export class Customer {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	@Column({ nullable: true })
	firstName: string;

	@Column({ nullable: true })
	lastName: string;

	@Column({ nullable: true })
	email: string;

	@Column()
	password: string;

	@Column({ type: 'text', nullable: true })
	address: string;

	@Column({ type: 'enum', enum: ActiveStatus, default: ActiveStatus.active })
	status: ActiveStatus;

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@UpdateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
		onUpdate: 'CURRENT_TIMESTAMP',
	})
	updatedAt: Date;

	@OneToMany(() => Order, (order) => order.customer)
	orders: Order[];
}
