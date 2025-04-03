import { Module } from '@nestjs/common';
import { ContactFormService } from './contact_form.service';
import { ContactFormController } from './contact_form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactBotServiceModule } from 'src/contact-bot-service/contact-bot-service.module';
import { ContactForm } from './entities/contact_form.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactForm]), ContactBotServiceModule],
  controllers: [ContactFormController],
  providers: [ContactFormService],
  exports: [ContactFormService],
})
export class ContactFormModule {}
