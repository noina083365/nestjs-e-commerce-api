import { ApiProperty } from '@nestjs/swagger';
import {
  IsStrongPassword,
  Length,
  Matches,
  MaxLength,
} from 'class-validator';

export class CustomerLoginDto {
  @ApiProperty({ example: 'uswshopping', description: 'Username' })
  @Length(4, 20)
  @Matches(/^[a-zA-Z0-9_]*$/, {
    message: 'Username can only contain letters, numbers, and underscores',
  })
  username: string;

  @ApiProperty({
    example: 'Passw0rd@!',
    description: 'Password',
  })
  password: string;
}