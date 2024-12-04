import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
	) { }

	async create(createUserDto: CreateUserDto) {
		const { password } = createUserDto;
		const hashPassword = await bcrypt.hash(password, 10);
		try {
			const newUser = await this.userRepository.save({ ...createUserDto, password: hashPassword });
			return newUser;
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	findAll() {
		try {
			return this.userRepository.find();
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	findOne(id: number) {
		try {
			return this.userRepository.findOneBy({ id });
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	async update(id: number, updateUserDto: UpdateUserDto) {
		try {
			await this.userRepository.update(id, updateUserDto);
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	async remove(id: number) {
		try {
			await this.userRepository.delete(id);
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}
}
