import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { OrderStatus } from '../../common/interfaces';
import { CreateOrderItemDto } from '../../order-item/dto/create-order-item.dto';

export class CreateOrderDto {
  @ApiProperty({ enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] })
  status: OrderStatus;

  @ApiProperty({
    example: '1059.63',
    description: 'Total amount (price) of the Product in the Order',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  totalAmount: number;

  @ApiProperty({
    example: '1',
    description: 'Customer ID',
  })
  @IsNotEmpty()
  customer: number;

  @ApiProperty({
    example: '[]',
    description: 'Order Item',
  })
  @IsNotEmpty()
  items: CreateOrderItemDto[];

  @ApiProperty({ description: 'Created date' })
  @IsOptional()
  createdAt?: Date;

  @ApiProperty({ description: 'Updated date' })
  @IsOptional()
  updatedAt?: Date;
}
