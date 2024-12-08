import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();
	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('api');

	const options = new DocumentBuilder()
		.setTitle('NestJS E-Commerce API')
		.setDescription(`E-Commerce's api created by NestJS`)
		.setVersion('1.0')
		.addServer('http://localhost:4554/', 'Local environment')
		.addServer('https://54.255.239.151:4554/', 'Production')
		.addTag('ECommerce')
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('/', app, document);

	await app.listen(process.env.PORT ?? 3553);
}
bootstrap();
