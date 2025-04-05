import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { ContactBotServiceService } from './contact-bot-service.service';
import { CreateContactFormDto } from 'src/contact_form/dto/create-contact_form.dto';

@Controller('contact-bot')
export class ContactBotServiceController {
  constructor(private readonly contactBotService: ContactBotServiceService) {}

  // Xabar yuborish metodini yaratish
  @Post('send-message')
  async sendMessage(@Body() contactFormData: CreateContactFormDto) {
    try {
      // Xabarni yuborish
      await this.contactBotService.sendContactFormNotification(contactFormData);
      return { message: '✅ Xabar yuborildi!' };
    } catch (error) {
      console.error('❌ Telegram xabar yuborishda xatolik:', error);
      
      // Xatolikni to‘g‘ri formatlash
      if (error.response) {
        throw new HttpException(
          `Telegram xabar yuborishda muammo: ${error.response.data.description || error.response.data}`,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      
      throw new HttpException(
        'Telegram xabar yuborishda nomalum muammo yuz berdi.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
