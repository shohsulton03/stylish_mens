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
import { ContactBotServiceModule } from './contact-bot-service/contact-bot-service.module';
import { ContactFormModule } from './contact_form/contact_form.module';
import { BOT_NAME } from './mybot/app.constants';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramModule } from './telegram_bot/telegram_bot.module';
import { MybotModule } from './mybot/mybot.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "static"),
    }),
    TelegrafModule.forRootAsync({
      botName: BOT_NAME,
      useFactory: () => {
        if (!process.env.MY_BOT_TOKEN) {
          throw new Error("BOT_TOKEN is not defined");
        }

        return {
          token: process.env.MY_BOT_TOKEN,
          include: [MybotModule],
          middlewares: [],
        };
      },
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
    MybotModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
