import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Product } from '../products/entities/product.entity';
import { OrderItem } from '../order-item/entities/order-item.entity';

@Injectable()
export class OrdersService {
	constructor(
		@InjectRepository(Order)
		private readonly orderRepository: Repository<Order>,
		@InjectRepository(OrderItem)
		private readonly orderItemRepository: Repository<OrderItem>,
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
	) { }

	// TODO: Remove later
	create(createOrderDto: CreateOrderDto) {
		return `This action returns a new order`;
	}

	async addProductToOrder(orderId: number, productId: number): Promise<OrderItem> {
		const order = await this.orderRepository.findOne({
			where: { id: orderId },
			relations: ['products'],
		});
		const product = await this.productRepository.findOne({
			where: { id: productId }
		});

		if (!order || !product) {
			throw new Error('Order or Product not found');
		}

		const item = {
			order,
			product,
			price: product.price,
			quantity: 1
		}

		const orderItem = this.orderItemRepository.create(item);
		return orderItem;
	}

	findAll() {
		return `This action returns all orders`;
	}

	findOne(id: number) {
		return `This action returns a #${id} order`;
	}

	update(id: number, updateOrderDto: UpdateOrderDto) {
		return `This action updates a #${id} order`;
	}

	remove(id: number) {
		return `This action removes a #${id} order`;
	}
}
