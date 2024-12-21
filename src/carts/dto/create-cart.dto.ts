import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';
import { CartStatus } from '../../common/interfaces';
import { Column } from 'typeorm';

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

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}