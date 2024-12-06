import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateCartItemDto {
  @ApiProperty({
    example: '1',
    description: 'Cart ID',
  })
  @IsNotEmpty()
  cartId: number;

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

  @ApiProperty({
    example: '123.56',
    description: 'Price per unit',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  totalPrice: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;
}