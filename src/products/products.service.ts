import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
	) { }

	create(createProductDto: CreateProductDto) {
		return 'This action adds a new product';
	}

	findAll() {
		try {
			return this.productRepository.find();
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	findOne(id: number) {
		return `This action returns a #${id} product`;
	}

	update(id: number, updateProductDto: UpdateProductDto) {
		return `This action updates a #${id} product`;
	}

	remove(id: number) {
		return `This action removes a #${id} product`;
	}
}
