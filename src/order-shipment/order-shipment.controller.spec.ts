import { Test, TestingModule } from '@nestjs/testing';
import { OrderShipmentController } from './order-shipment.controller';
import { OrderShipmentService } from './order-shipment.service';

describe('OrderShipmentController', () => {
	let controller: OrderShipmentController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OrderShipmentController],
			providers: [OrderShipmentService],
		}).compile();

		controller = module.get<OrderShipmentController>(OrderShipmentController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
