import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { ContactModule } from './contact/contact.module';
import { FaqModule } from './faq/faq.module';
import { AuthModule } from './auth/auth.module';
import { TeamSectionModule } from './team_section/team_section.module';
import { FileModule } from './file/file.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CategoryModule } from './category/category.module';
import { DiscountModule } from './discount/discount.module';
import { SizesModule } from './sizes/sizes.module';
import { ColorsModule } from './colors/colors.module';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { TelegramModule } from './telegram_bot/telegram_bot.module';
import { ContactBotServiceModule } from './contact-bot-service/contact-bot-service.module';
import { ContactFormModule } from './contact_form/contact_form.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "static"),
    }),
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
    AdminModule,
    ContactModule,
    FaqModule,
    AuthModule,
    TeamSectionModule,
    FileModule,
    CategoryModule,
    DiscountModule,
    SizesModule,
    ColorsModule,
    ProductModule,
    OrderModule,
    TelegramModule,
    ContactBotServiceModule,
    ContactFormModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
