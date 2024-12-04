import { ApiProperty } from '@nestjs/swagger';

import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  Length,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    example: 'Keyboard',
    description: 'Name of the product',
  })
  @Length(3, 125)
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 'The easiest keyboard to use for coding.',
    description: 'Description of the product',
  })
  @Length(3, 200)
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    example: '359',
    description: 'Price of the product',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({
    example: '10',
    description: 'Stock of the product',
  })
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  stock: number;
}
