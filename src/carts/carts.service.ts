import { Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Cart } from './entities/cart.entity';
// import { Repository } from 'typeorm';

@Injectable()
export class CartsService {
	// constructor(
	// 	@InjectRepository(Cart)
	// 	private readonly cartRepository: Repository<Cart>,
	// ) { }

	// async create(createCartDto: CreateCartDto): Promise<Cart> {
	// 	const order = await this.cartRepository.findOne({
	// 		where: { id: orderId },
	// 		relations: ['products'],
	// 	});
	// 	const product = await this.productRepository.findOne({
	// 		where: { id: productId }
	// 	});

	// 	if (!order || !product) {
	// 		throw new Error('Order or Product not found');
	// 	}

	// 	const item = {
	// 		order,
	// 		product,
	// 		price: product.price,
	// 		quantity: 1
	// 	}

	// 	const orderItem = this.orderItemRepository.create(item);
	// 	return orderItem;
	// }
}
