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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
