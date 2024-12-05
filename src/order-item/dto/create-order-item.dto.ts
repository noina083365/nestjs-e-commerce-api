import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty({
    example: '1',
    description: 'Order ID',
  })
  @IsNotEmpty()
  orderId: number;

  @ApiProperty({
    example: '1',
    description: 'Product ID',
  })
  @IsNotEmpty()
  productId: number;

  @ApiProperty({
    example: '20',
    description: 'QTY of the Product in the Order',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  quantity: number;

  @ApiProperty({
    example: '123.56',
    description: 'Price per unit',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;
}