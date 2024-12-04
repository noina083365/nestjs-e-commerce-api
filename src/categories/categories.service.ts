import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
	constructor(
		@InjectRepository(Category)
		private readonly categoryRepository: Repository<Category>,
	) { }

	async create(createCategoryDto: CreateCategoryDto) {
		try {
			const user = await this.categoryRepository.findOne({ where: { name: createCategoryDto.name } });
			if (user) {
				throw new HttpException('This name already exists.', 400);
			}
			return this.categoryRepository.save(createCategoryDto);
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	findAll() {
		try {
			return this.categoryRepository.find();
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	findOne(id: number) {
		try {
			return this.categoryRepository.findOneBy({ id });
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	async update(id: number, updateCategoryDto: UpdateCategoryDto) {
		try {
			await this.categoryRepository.update(id, updateCategoryDto);
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	async remove(id: number) {
		try {
			await this.categoryRepository.delete(id);
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}
}
