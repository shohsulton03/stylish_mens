import { Module } from '@nestjs/common';
import { ContactBotServiceService } from './contact-bot-service.service';

@Module({
  imports: [ContactBotServiceModule],
  providers: [ContactBotServiceService],
  exports: [ContactBotServiceService],
})
export class ContactBotServiceModule {}
