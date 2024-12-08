import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

const mockCategoryRepository = () => ({
	find: jest.fn(),
	findOne: jest.fn(),
	create: jest.fn(),
	save: jest.fn(),
});

describe('CategoriesService', () => {
	let service: CategoriesService;
	let categoryRepository: Repository<Category>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CategoriesService,
				{
					provide: getRepositoryToken(Category),
					useFactory: mockCategoryRepository,
				},
			],
		}).compile();

		service = module.get<CategoriesService>(CategoriesService);
		categoryRepository = module.get<Repository<Category>>(
			getRepositoryToken(Category),
		);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
