import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/customer-register.dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

const mockUserRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

const mockUser = {
  username: 'wbusermember',
  password: 'Passw0rd001',
};

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let jwtService: JwtService;
  let userRepository: Repository<User>;
  const expectedResponse = {
    accessToken: 'kanokpit-dev-nestjs-e-commerce',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: getRepositoryToken(User),
          useFactory: mockUserRepository,
        },
        UsersService,
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn().mockResolvedValue(expectedResponse),
          },
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    jwtService = module.get<JwtService>(JwtService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('auth', () => {
    it('should login and return an access token', async () => {
      const spyFindOneUser = jest
        .spyOn(userRepository, 'findOne')
        .mockResolvedValue(mockUser as User);

      const spyCompare = jest
        .spyOn(bcrypt, 'compare')
        .mockReturnValue(true as any);

      const spySignAsync = jest
        .spyOn(jwtService, 'signAsync')
        .mockResolvedValue('accessToken');

      await authService.login(mockUser);
      expect(spyFindOneUser).toHaveBeenCalledWith({
        where: { username: mockUser.username },
      });
      expect(spyCompare).toHaveBeenCalledWith('Passw0rd001', mockUser.password);
      expect(spySignAsync).toHaveBeenCalled();
    });
    it('should register', async () => {
      const registerDtoDto: RegisterDto = {
        username: 'testusername',
        password: 'Passw0rd001',
      };
      const msg = await authService.register(registerDtoDto);
      expect(msg).not.toBeNull();
    });
  });
});