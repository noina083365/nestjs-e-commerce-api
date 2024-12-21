import { Customer } from 'src/customers/entities/customer.entity';
import { Order } from '../../orders/entities/order.entity';
import {
	Column,
	CreateDateColumn,
	Entity,
	ManyToOne,
	PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('order_shipment')
export class OrderShipment {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Order, (order) => order.items)
	order: Order; // order_id

	@ManyToOne(() => Customer, { eager: true })
	customer: Customer; // customer_id

	@Column()
	address: string;

	@Column()
	shippingCost: number;

	@Column()
	shippingMethod: string;

	@Column()
	shipmentStatus: string;

	@Column()
	trackingNumber: string;

	@CreateDateColumn({
		type: 'timestamp',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt: Date;

	@CreateDateColumn({
		type: 'date',
		default: () => 'CURRENT_DATE',
	})
	estimatedDeliveryDate: Date;
}
