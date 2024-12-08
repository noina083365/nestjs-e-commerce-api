import { HttpException, Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
	constructor(
		@InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
	) { }

	create(createCustomerDto: CreateCustomerDto) {
		return 'This action adds a new customer';
	}

	findAll() {
		try {
			return this.customerRepository.find();
		} catch (error) {
			throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
		}
	}

	findOne(id: number) {
		return `This action returns a #${id} customer`;
	}

	update(id: number, updateCustomerDto: UpdateCustomerDto) {
		return `This action updates a #${id} customer`;
	}

	remove(id: number) {
		return `This action removes a #${id} customer`;
	}
}
