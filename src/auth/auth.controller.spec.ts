import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('Auth Controller', () => {
  let controller: AuthController;
  let service: AuthService;
  const mockUserRequest = {
    password: 'Password01!',
    username: 'testuser',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            login: jest.fn().mockResolvedValue({ msg: 'Login successfully.' }),
            register: jest
              .fn()
              .mockResolvedValue({ msg: 'Register successfully.' }),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should call login method', async () => {
    const loginSpy = jest.spyOn(service, 'customerLogin');
    await controller.login(mockUserRequest);
    expect(loginSpy).toHaveBeenCalled();
  });

  it('should call register method', async () => {
    const registerSpy = jest.spyOn(service, 'customerRegister');
    await controller.register(mockUserRequest);
    expect(registerSpy).toHaveBeenCalled();
  });
});