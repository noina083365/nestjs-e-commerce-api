import { Test, TestingModule } from '@nestjs/testing';
import { CartsService } from './carts.service';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { getRepositoryToken } from '@nestjs/typeorm';

const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('CartsService', () => {
  let service: CartsService;
  let productRepository: Repository<Cart>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CartsService,
        {
          provide: getRepositoryToken(Cart),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    service = module.get<CartsService>(CartsService);
    productRepository = module.get<Repository<Cart>>(
      getRepositoryToken(Cart),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
