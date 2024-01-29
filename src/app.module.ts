import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { database_config } from './configs/configuration.config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production', 'test', 'provision', 'staging')
          .default('development'),
        PORT: Joi.number().default(3000),
      }),
      validationOptions: {
        abortEarly: false, // abortEarly: false để hiển thị toàn bộ các biến môi trường có lỗi thay vì mặc định chỉ hiển thị biến đầu tiên
      },
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'development' ? '.env.dev' : '.env',
      load: [database_config],
      cache: true, // <== Ở đây
      expandVariables: true, // Option expandVariables giúp chúng ta truy cập vào một biến môi trường khác trong file env.
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
