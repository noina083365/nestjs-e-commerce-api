import { HttpException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
	constructor(
		@InjectRepository(Product)
		private readonly productRepository: Repository<Product>,
	) { }

	async create(createProductDto: CreateProductDto) {
		try {
			const user = await this.productRepository.findOne({ where: { name: createProductDto.name } });
			if (user) {
				throw new HttpException('This name already exists.', 400);
			}
			return this.productRepository.save(createProductDto);
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	async findAllInStock() {
		try {
			const products = await this.productRepository.find({
				where: { stock: MoreThan(0) }
			});
			return products;
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	findAll() {
		try {
			return this.productRepository.find();
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	findOne(id: number) {
		try {
			return this.productRepository.findOneBy({ id });
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	async update(id: number, updateProductDto: any) {
		try {
			await this.productRepository.update(id, updateProductDto);
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	remove(id: number) {
		return `This action removes a #${id} product`;
	}
}
