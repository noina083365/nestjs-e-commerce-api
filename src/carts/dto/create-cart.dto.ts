import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { CartStatus } from 'src/common/interfaces';
import { CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateCartDto {
  @ApiProperty({
    example: '1',
    description: 'Customer ID',
  })
  @IsNotEmpty()
  customerId: number;

  @ApiProperty({
    example: '123.56',
    description: 'Price per unit',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  totalPrice: number;

  @ApiProperty({ enum: ['Open', 'Checkout'] })
  status: CartStatus;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updatedAt: Date;
}