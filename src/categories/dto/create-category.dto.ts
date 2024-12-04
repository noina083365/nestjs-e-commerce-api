import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, Length, Matches } from 'class-validator';

export class CreateCategoryDto {
	@ApiProperty({ example: 'Gadgets', description: 'Name of the category' })
	@IsNotEmpty()
	@Length(3, 200)
	name: string;

	@ApiProperty({ description: 'Created date' })
	@IsOptional()
	createdAt?: Date;

	@ApiProperty({ description: 'Updated date' })
	@IsOptional()
	updatedAt?: Date;
}
