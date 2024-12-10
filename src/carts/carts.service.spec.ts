import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CartItem } from '../cart-item/entities/cart-item.entity';

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('CartsService', () => {
  let service: CartsService;
  let cartRepository: Repository<Cart>;
  let cartItemRepository: Repository<CartItem>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartsService,
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

    service = module.get<CartsService>(CartsService);
    cartRepository = module.get<Repository<Cart>>(
      getRepositoryToken(Cart),
    );
    cartItemRepository = module.get<Repository<CartItem>>(
      getRepositoryToken(CartItem),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
