import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { CartItem } from '../cart-item/entities/cart-item.entity';

@Injectable()
export class CartsService {
	constructor(
		@InjectRepository(Cart)
		private readonly cartRepository: Repository<Cart>,
		@InjectRepository(CartItem)
		private readonly cartItemRepository: Repository<CartItem>,
	) { }

	async customerCartOpen(customerId: number) {
		let itemList: any[] = [];
		try {
			const cartOpen = await this.cartRepository.findOne({
				where: {
					customer: { id: customerId },
					status: 'Open'
				},
			});
			if (cartOpen) {
				const cartItems = await this.cartItemRepository.find({
					where: {
						cart: { id: cartOpen.id }
					},
					relations: ['product']
				});
				itemList = cartItems.map((cItem: CartItem) => {
					const newItemKey = {
						id: cItem.product.id,
						name: cItem.product.name,
						description: cItem.product.description,
						price: cItem.product.price,
						stock: cItem.product.stock,
						quantity: cItem.quantity,
					}
					return newItemKey;
				});
			}
			return itemList;
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	async updateCustomerCart(customerCart: any) {
		const { customerId, cartItems, total_price } = customerCart;
		try {
			const openCart = await this.cartRepository.findOne({
				where: {
					customer: { id: customerId },
					status: 'Open'
				}
			});
			let cartId = 0;
			if (openCart) {
				cartId = openCart.id;
				const cartUpdate = await this.cartRepository.update(cartId, {
					total_price: parseFloat(total_price)
				});
			} else {
				const custCart = {
					customer: { id: customerId },
					status: 'Open',
					total_price: parseFloat(total_price)
				};
				const cart = await this.cartRepository.save(custCart);
				cartId = cart.id
			}
			if (cartId !== 0) {
				const [rows, count]: [CartItem[], number] = await this.cartItemRepository.findAndCount({
					where: {
						cart: { id: cartId }
					}
				});
				if (count > 0) {
					await this.cartItemRepository
						.createQueryBuilder()
						.delete()
						.where("cartId = :cartId", { cartId })
						.execute();
				}
				cartItems.map(async (item: any) => {
					const cartItem = {
						cart: { id: cartId },
						price: parseFloat(item.price),
						product: { id: parseInt(item.id) },
						quantity: parseInt(item.quantity)
					};
					await this.cartItemRepository.save(cartItem);
				});
			} else {
				throw new HttpException('Cannot update cart.', 500);
			}
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}
}
