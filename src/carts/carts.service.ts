import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';

@Injectable()
export class CartsService {
	constructor(
		@InjectRepository(Cart)
		private readonly cartRepository: Repository<Cart>,
	) { }

	// TODO: Store to DB
	// Which cart id?
		// find by customer_id that status is open
			// true: found
				// select exist cart id
			// false: not found
				// create new cart and get id

			// store in the cart
			// store in the cart item

	async create(createCartDto: CreateCartDto) {
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
	}
}
