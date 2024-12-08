import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { CustomerRegisterDto } from './dto/customer-register.dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CustomersService } from '../customers/customers.service';
import { Customer } from '../customers/entities/customer.entity';

const mockUserRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

const mockUser = {
  username: 'wbusercustshop',
  password: 'Passw0rd001',
};

describe('AuthService', () => {
  let authService: AuthService;
  let customersService: CustomersService;
  let jwtService: JwtService;
  let customerRepository: Repository<Customer>;
  const expectedResponse = {
    accessToken: 'kanokpit-dev-nestjs-e-commerce',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(Customer),
          useFactory: mockUserRepository,
        },
        CustomersService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue(expectedResponse),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    customersService = module.get<CustomersService>(CustomersService);
    jwtService = module.get<JwtService>(JwtService);
    customerRepository = module.get<Repository<Customer>>(getRepositoryToken(Customer));
  });

  describe('auth', () => {
    it('should login and return an access token', async () => {
      const spyFindOneUser = jest
        .spyOn(customerRepository, 'findOne')
        .mockResolvedValue(mockUser as Customer);

      const spyCompare = jest
        .spyOn(bcrypt, 'compare')
        .mockReturnValue(true as any);

      const spySignAsync = jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValue('accessToken');

      await authService.customerLogin(mockUser);
      expect(spyFindOneUser).toHaveBeenCalledWith({
        where: { username: mockUser.username },
      });
      expect(spyCompare).toHaveBeenCalledWith('Passw0rd001', mockUser.password);
      expect(spySignAsync).toHaveBeenCalled();
    });
    it('should register', async () => {
      const registerDtoDto: CustomerRegisterDto = {
        username: 'testusername',
        password: 'Passw0rd001',
      };
      const msg = await authService.customerRegister(registerDtoDto);
      expect(msg).not.toBeNull();
    });
  });
});