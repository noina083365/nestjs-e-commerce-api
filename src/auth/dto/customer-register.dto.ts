import { ApiProperty } from '@nestjs/swagger';
import {
  IsStrongPassword,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CustomerRegisterDto {
  @ApiProperty({ example: 'uswshopping', description: 'Username' })
  @Length(4, 20)
  @Matches(/^[a-zA-Z0-9_]*$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  username: string;

  @ApiProperty({
    example: 'euwshop@!',
    description:
      'Password min length: 8, 1 lowerscase and uppercase letter, 1 number, 1 symbol',
  })
  @MaxLength(20)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  },
    {
      message: 'Password min length: 8, 1 lowerscase and uppercase letter, 1 number, 1 symbol'
    })
  password: string;
}