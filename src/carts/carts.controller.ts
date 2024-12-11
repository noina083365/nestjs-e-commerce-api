import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CartsService } from './carts.service';

@Controller('carts')
export class CartsController {
  constructor(private readonly cartsService: CartsService) { }

  @Get('/customer/:id')
  getCustomerCartOpen(@Param('id') customerId: string) {
    return this.cartsService.customerCartOpen(+customerId);
  }

  @Post()
  addToCart(@Body() customerCart: any) {
    return this.cartsService.updateCustomerCart(customerCart);
  }
}
