import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { CustomersModule } from './customers/customers.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule], // Make ConfigModule available
			useFactory: async (configService: ConfigService) => ({
				type: 'mysql',
				host: configService.get<string>('DB_HOST'),
				port: parseInt(configService.get<string>('DB_PORT')),
				username: configService.get<string>('DB_USERNAME'),
				password: configService.get<string>('DB_PASSWORD'),
				database: configService.get<string>('DB_DATABASE'),
				entities: ['dist/**/*.entity{.ts,.js}'],
				synchronize: true,
			}),
			inject: [ConfigService], // Inject ConfigService to use it in useFactory
		}),
		UsersModule,
		CustomersModule,
		CategoriesModule,
		ProductsModule,
		OrdersModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule { }
