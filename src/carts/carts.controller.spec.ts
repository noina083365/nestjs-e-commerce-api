import { Test, TestingModule } from '@nestjs/testing';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CartItem } from '../cart-item/entities/cart-item.entity';

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('CartsController', () => {
  let controller: CartsController;
  let cartRepository: Repository<Cart>;
  let cartItemRepository: Repository<CartItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CartsController],
      providers: [
        CartsService,
        {
          provide: getRepositoryToken(Cart),
          useFactory: mockRepository,
        },
        {
          provide: getRepositoryToken(CartItem),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    controller = module.get<CartsController>(CartsController);
    cartRepository = module.get<Repository<Cart>>(
      getRepositoryToken(Cart),
    );
    cartItemRepository = module.get<Repository<CartItem>>(
      getRepositoryToken(CartItem),
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
