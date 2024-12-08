import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockRepository = () => ({
	find: jest.fn(),
	findOne: jest.fn(),
	create: jest.fn(),
	save: jest.fn(),
});

describe('ProductsController', () => {
	let controller: ProductsController;
	let productRepository: Repository<Product>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductsController],
			providers: [
				ProductsService,
				{
					provide: getRepositoryToken(Product),
					useFactory: mockRepository,
				},
			],
		}).compile();

		controller = module.get<ProductsController>(ProductsController);
		productRepository = module.get<Repository<Product>>(
			getRepositoryToken(Product),
		);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
