import { Test, TestingModule } from '@nestjs/testing';
import { CustomersController } from './customers.controller';
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

describe('CustomersController', () => {
	let controller: CustomersController;
	let customerRepository: Repository<Customer>;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [CustomersController],
			providers: [
				CustomersService,
				{
					provide: getRepositoryToken(Customer),
					useFactory: mockUserRepository,
				},
			],
		}).compile();

		controller = module.get<CustomersController>(CustomersController);
		customerRepository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
