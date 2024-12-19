import { Module } from '@nestjs/common';
import { OrderShipmentController } from './order-shipment.controller';
import { OrderShipmentService } from './order-shipment.service';

@Module({
	controllers: [OrderShipmentController],
	providers: [OrderShipmentService],
})
export class OrderItemModule {}
