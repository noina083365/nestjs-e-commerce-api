import { HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerLoginDto } from './dto/customer-login.dto';
import { CustomerRegisterDto } from './dto/customer-register.dto';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Customer } from '../customers/entities/customer.entity';

const jwtSecret = 'nest-e-commerce-2024';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Customer) private readonly customerRepository: Repository<Customer>,
    private jwtService: JwtService,
  ) { }

  async customerRegister(registerDto: CustomerRegisterDto) {
    const { username: usernameOrEmail, password } = registerDto;
    const userByUsername = await this.customerRepository.findOne({ where: { username: usernameOrEmail } });
    const userByEmail = await this.customerRepository.findOne({ where: { email: usernameOrEmail } });
    if (userByUsername || userByEmail) {
      throw new UnauthorizedException('This username already exists.');
    }
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const newUser = this.customerRepository.create({
        username: usernameOrEmail,
        password: hashPassword,
      });
      return this.customerRepository.save(newUser);
    } catch (error) {
      throw new HttpException(error.message || 'Internal Server Error.', error.status || 500);
    }
  }

  async customerLogin(loginDto: CustomerLoginDto) {
    const { username: usernameOrEmail, password } = loginDto;
    const userByUsername = await this.customerRepository.findOne({ where: { username: usernameOrEmail } });
    const userByEmail = await this.customerRepository.findOne({ where: { email: usernameOrEmail } });

    if (!userByUsername && !userByEmail) {
      throw new UnauthorizedException('Invalid username or password.');
    }

    const user = userByUsername ? userByUsername : userByEmail;

    const validPassword = await bcrypt.compare(password, user.password);

    if (validPassword) {
      const accessToken = await this.jwtService.signAsync(
        {
          id: user.id,
          username: user.username,
        },
        {
          secret: jwtSecret,
          expiresIn: '24h',
        },
      );
      return { accessToken };
    } else {
      throw new UnauthorizedException('Invalid username or password.');
    }
  }
}