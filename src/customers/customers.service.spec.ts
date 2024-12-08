import { Test, TestingModule } from '@nestjs/testing';
import { CustomersService } from './customers.service';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockUserRepository = () => ({
	find: jest.fn(),
	findOne: jest.fn(),
	create: jest.fn(),
	save: jest.fn(),
});

describe('CustomersService', () => {
	let service: CustomersService;
	let customerRepository: Repository<Customer>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CustomersService,
				{
					provide: getRepositoryToken(Customer),
					useFactory: mockUserRepository,
				},
			],
		}).compile();

		service = module.get<CustomersService>(CustomersService);
		customerRepository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
