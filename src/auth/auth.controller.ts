import { Body, Controller, Post } from '@nestjs/common';
import { CustomerLoginDto } from './dto/customer-login.dto';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CustomerRegisterDto } from './dto/customer-register.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  [x: string]: any;
  constructor(private authService: AuthService) { }

  @Post('customer-login')
  async login(@Body() loginDto: CustomerLoginDto) {
    return this.authService.customerLogin(loginDto);
  }

  @Post('customer-register')
  async register(@Body() registerDto: CustomerRegisterDto) {
    return this.authService.customerRegister(registerDto);
  }
}