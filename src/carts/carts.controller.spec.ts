import { Test, TestingModule } from '@nestjs/testing';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('CartsController', () => {
  let controller: CartsController;
  let productRepository: Repository<Cart>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartsController],
      providers: [
        CartsService,
        {
          provide: getRepositoryToken(Cart),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<CartsController>(CartsController);
    productRepository = module.get<Repository<Cart>>(
      getRepositoryToken(Cart),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
