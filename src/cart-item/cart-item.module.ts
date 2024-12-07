import { Module } from '@nestjs/common';
import { CartItemService } from './cart-item.service';
import { CartItemController } from './cart-item.controller';
import { OrderItem } from 'src/order-item/entities/order-item.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
	imports: [TypeOrmModule.forFeature([OrderItem])],
  controllers: [CartItemController],
  providers: [CartItemService],
})
export class CartItemModule {}
