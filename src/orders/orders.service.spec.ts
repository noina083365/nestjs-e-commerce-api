import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { Order } from './entities/order.entity';
import { OrderItem } from '../order-item/entities/order-item.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';

const mockRepository = () => ({
	find: jest.fn(),
	findOne: jest.fn(),
	create: jest.fn(),
	save: jest.fn(),
});

describe('OrdersService', () => {
	let service: OrdersService;
	let orderRepository: Repository<Order>;
	let orderItemRepository: Repository<OrderItem>;
	let productRepository: Repository<Product>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				OrdersService,
				{
					provide: getRepositoryToken(Order),
					useFactory: mockRepository,
				},
			],
		}).compile();

		service = module.get<OrdersService>(OrdersService);
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
		expect(service).toBeDefined();
	});
});
