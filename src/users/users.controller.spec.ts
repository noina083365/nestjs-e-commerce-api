import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { createResponse, MockResponse } from 'node-mocks-http';
import { Response } from 'express';
import { UserRole } from '../common/interfaces';

describe('User Controller', () => {
	let controller: UsersController;
	let service: UsersService;
	const createUserDto: CreateUserDto = {
		username: 'userwebboard',
		firstName: 'test',
		lastName: 'test',
		password: 'Password11@',
		email: 'test@test.com',
		role: UserRole.Store,
	};

	const mockUser: any = {
		username: 'userwebboard',
		firstName: 'test',
		lastName: 'test',
		password: 'Password11@',
		email: 'test@test.com',
		role: UserRole.Store,
	};

	const mockResponse = [
		{
			username: '1sss1',
			first_name: 'test',
			last_name: 'test',
			password: 'Password11@',
			password_reset_code: '1',
			email: 'te@test.com',
			email_code: 'eee',
			activation_code: 'e',
		},
		{
			username: 'test',
			first_name: 'test',
			last_name: 'test',
			password: 'Password11@',
			password_reset_code: '1',
			email: 'te@test.com',
			email_code: 'eee',
			activation_code: 'e',
		},
	];

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UsersController],
			providers: [
				{
					provide: UsersService,
					useValue: {
						create: jest.fn().mockResolvedValue(createUserDto),
						findAll: jest.fn().mockResolvedValue(mockResponse),
					},
				},
			],
		}).compile();

		controller = module.get<UsersController>(UsersController);
		service = module.get<UsersService>(UsersService);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('create()', () => {
		it('should create a new user', async () => {
			let response: MockResponse<Response> = createResponse();
			response.json = jest.fn();
			const createSpy = jest
				.spyOn(service, 'create')
				.mockResolvedValueOnce(mockUser as never);
			await controller.create(createUserDto);
			expect(createSpy).toHaveBeenCalledWith(createUserDto);
		});
	});
});
