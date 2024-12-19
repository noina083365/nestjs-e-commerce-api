import { Controller } from '@nestjs/common';
import { OrderShipmentService } from './order-shipment.service';

@Controller('order-shipment')
export class OrderShipmentController {
	constructor(private readonly orderItemService: OrderShipmentService) {}
}
