import { Test, TestingModule } from '@nestjs/testing';
import { OrderShipmentService } from './order-shipment.service';

describe('OrderItemService', () => {
	let service: OrderShipmentService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [OrderShipmentService],
		}).compile();

		service = module.get<OrderShipmentService>(OrderShipmentService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});
