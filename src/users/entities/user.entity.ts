import { UserRole } from 'src/common/interfaces';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	@Column({ nullable: true })
	firstName: string;

	@Column({ nullable: true })
	lastName: string;

	@Column({ nullable: true })
	email: string;

	@Column()
	password: string;

	@Column({ type: 'enum', enum: UserRole, default: UserRole.Admin })
	role: UserRole;

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
