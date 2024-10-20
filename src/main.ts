import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import * as process from "process";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({credentials: true, origin: ['http://localhost:3000', 'http://127.0.0.1:3000']});
    app.setGlobalPrefix('/api');
    app.useGlobalPipes(new ValidationPipe({transform:true}));

    const config = new DocumentBuilder()
        .setTitle('sboard')
        .setVersion('1.0')
        .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, documentFactory);

    await app.listen(process.env.PORT ?? 3001);
}

bootstrap();
