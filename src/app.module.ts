import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { CategoryModule } from './category/category.module';
import { DiscountModule } from './discount/discount.module';
import { SizesModule } from './sizes/sizes.module';
import { ColorsModule } from './colors/colors.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      synchronize: true,
      entities: [join(__dirname, "**/*.entity.{ts,js}")],
      logging: true,
      autoLoadEntities: true,
    }),
    CategoryModule,
    DiscountModule,
    SizesModule,
    ColorsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
