import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockCategoryRepository = () => ({
	find: jest.fn(),
	findOne: jest.fn(),
	create: jest.fn(),
	save: jest.fn(),
});

describe('ProductsService', () => {
	let service: ProductsService;
	let productRepository: Repository<Product>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				ProductsService,
				{
					provide: getRepositoryToken(Product),
					useFactory: mockCategoryRepository,
				},
			],
		}).compile();

		service = module.get<ProductsService>(ProductsService);
		productRepository = module.get<Repository<Product>>(
			getRepositoryToken(Product),
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
