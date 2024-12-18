import { HttpException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { OrderItem } from '../order-item/entities/order-item.entity';

@Injectable()
export class OrdersService {
	constructor(
		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,
		@InjectRepository(OrderItem)
		private readonly orderItemRepository: Repository<OrderItem>,
	) { }

	findOne(id: number) {
		try {
			return this.orderRepository.findOneBy({ id });
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	async createOrder(createOrderDto: CreateOrderDto) {
		const { items, total_price, customerId } = createOrderDto;
		try {
			const order = await this.orderRepository.save({
				customer: { id: customerId },
				status: 'Pending',
				total_price
			});

			if (order && order.id) {
				items.map(async (item: any) => {
					const orderItem = {
						order: { id: order.id },
						price: parseFloat(item.price),
						product: { id: parseInt(item.id) },
						quantity: parseInt(item.quantity)
					};
					await this.orderItemRepository.save(orderItem);
				});
			} else {
				throw new HttpException('Cannot update cart.', 500);
			}
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	async createOrderFromCart(checkoutData: any) { // Cart
		const { cartId } = checkoutData;
		try {
			const cart = {};
			/*
			const order = await this.orderRepository.save({
				customer: { id: customerId },
				status: 'Pending',
				total_price
			});

			if (order && order.id) {
				items.map(async (item: any) => {
					const orderItem = {
						order: { id: order.id },
						price: parseFloat(item.price),
						product: { id: parseInt(item.id) },
						quantity: parseInt(item.quantity)
					};
					await this.orderItemRepository.save(orderItem);
				});
				// update cart to Checkout
			} else {
				throw new HttpException('Cannot update cart.', 500);
			}
			*/
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	findAll() {
		try {
			return this.orderRepository.find();
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	async orderList(customerId: number, status: string = 'Pending') {
		let orderList: any[] = [];
		try {
			const orders = await this.orderRepository.find({
				where: {
					customer: { id: customerId },
					status
				},
			});
			if (orders && orders.length) {
				// 	const cartItems = await this.orderRepository.find({
				// 		where: {
				// 			order: { id: cartOpen.id }
				// 		},
				// 		relations: ['product']
				// 	});
				// 	orderList = cartItems.map((cItem: CartItem) => {
				// 		const newItemKey = {
				// 			id: cItem.product.id,
				// 			name: cItem.product.name,
				// 			description: cItem.product.description,
				// 			price: cItem.product.price,
				// 			stock: cItem.product.stock,
				// 			quantity: cItem.quantity,
				// 		}
				// 		return newItemKey;
				// 	});
			}
			return orderList;
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	async updateOrder(id: number, status: string) {
		let orderUpdate = null;
		try {
			const order = await this.orderRepository.findOne({
				where: { id }
			});
			if (order) {
				orderUpdate = await this.orderRepository.update(id, {
					status
				});
			}
			return orderUpdate;
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	async remove(id: number) {
		try {
			await this.orderRepository.delete(id);
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}
}
