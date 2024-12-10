import { Body, Controller, Post } from '@nestjs/common';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) { }

  @Post()
  customerCart(@Body() customerCart: any) {
    return this.cartsService.customerCart(customerCart);
  }
}
