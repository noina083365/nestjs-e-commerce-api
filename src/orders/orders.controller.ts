import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UpdateOrderDto } from './dto/update-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
	constructor(private readonly ordersService: OrdersService) {}

	@Post()
	create(@Body() orderData: any) {
		// Buy Now
		return this.ordersService.createOrder(orderData);

		// Checkout
		// return this.ordersService.createOrderFromCart(orderData);
	}

	@Get()
	findAll() {
		return this.ordersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.ordersService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
		return this.ordersService.updateOrder(+id, updateOrderDto.status);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.ordersService.remove(+id);
	}
}
