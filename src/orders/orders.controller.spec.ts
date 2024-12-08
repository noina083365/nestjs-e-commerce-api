import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { OrderItem } from '../order-item/entities/order-item.entity';
import { Product } from '../products/entities/product.entity';

const mockRepository = () => ({
	find: jest.fn(),
	findOne: jest.fn(),
	create: jest.fn(),
	save: jest.fn(),
});

describe('OrdersController', () => {
	let controller: OrdersController;
	let orderRepository: Repository<Order>;
	let orderItemRepository: Repository<OrderItem>;
	let productRepository: Repository<Product>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OrdersController],
			providers: [
				OrdersService,
				{
					provide: getRepositoryToken(Order),
					useFactory: mockRepository,
				},
			],
		}).compile();

		controller = module.get<OrdersController>(OrdersController);
		orderRepository = module.get<Repository<Order>>(
			getRepositoryToken(Order),
		);
		orderItemRepository = module.get<Repository<OrderItem>>(
			getRepositoryToken(OrderItem),
		);
		productRepository = module.get<Repository<Product>>(
			getRepositoryToken(Product),
		);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
