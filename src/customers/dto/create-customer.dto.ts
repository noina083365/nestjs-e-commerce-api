import { ApiProperty } from '@nestjs/swagger';

import {
	IsEmail,
	IsOptional,
	Length,
	Matches,
} from 'class-validator';
import { ActiveStatus } from '../../common/interfaces';

export class CreateCustomerDto {
	@ApiProperty({ example: 'user_ecom', description: 'Username of the user' })
	@Length(4, 20)
	@Matches(/^[a-zA-Z0-9_]*$/, {
		message: 'Username can only contain letters, numbers, and underscores',
	})
	username: string;

	@ApiProperty({ example: 'First', description: 'First name' })
	@Length(1, 50)
	@Matches(/^[a-zA-Z0-9- ]*$/, {
		message: 'Firstname can only contain letters, numbers, hyphens, spaces',
	})
	firstName: string;

	@ApiProperty({ example: 'Last', description: 'Last name' })
	@Length(1, 50)
	@Matches(/^[a-zA-Z0-9- ]*$/, {
		message: 'Lastname can only contain letters, numbers, hyphens, spaces',
	})
	lastName: string;

	@ApiProperty({ example: 'UserTest@test.com', description: 'email of the user' })
	@IsEmail()
	email: string;

	@ApiProperty({
		example: 'House no. 777 Moo 7 T. Chong Maew, A. Muang, Nakhon Ratchasima 30270 THAILAND',
		description: 'Last name'
	})
	@IsOptional()
	address: string;

	@ApiProperty({ example: 'ECom001!', description: 'Password' })
	password: string;

	@ApiProperty({ enum: ['active', 'inactive'] })
	status: ActiveStatus;

	@ApiProperty({ description: 'Created date' })
	@IsOptional()
	createdAt?: Date;

	@ApiProperty({ description: 'Updated date' })
	@IsOptional()
	updatedAt?: Date;
}
