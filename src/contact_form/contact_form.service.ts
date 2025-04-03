import { BadGatewayException, Injectable } from '@nestjs/common';
import { CreateContactFormDto } from './dto/create-contact_form.dto';
import { UpdateContactFormDto } from './dto/update-contact_form.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactForm } from './entities/contact_form.entity';
import { Repository } from 'typeorm';
import { ContactBotServiceService } from 'src/contact-bot-service/contact-bot-service.service';

@Injectable()
export class ContactFormService {

  constructor(
    @InjectRepository(ContactForm) private readonly contactFormRepo: Repository<ContactForm>,
    private contactFormService: ContactBotServiceService
  ) {}
  async create(createContactFormDto: CreateContactFormDto) {
    try{
      // Contact formni yaratish
    const contact = this.contactFormRepo.create(createContactFormDto);
    const contactForm = await this.contactFormRepo.save(contact); 
  
    if (!contact.id) {
      throw new BadGatewayException('Failed to create contact');
    }
  
    // Telegram botga yuborish
    await this.contactFormService.sendContactFormNotification(contactForm);
    
    return contactForm;

    } catch(error){
      console.error(error.stack);
      throw new BadGatewayException('Failed to create contact');
    }
  
  }
  
  
  findAll() {
    return this.contactFormRepo.find();
  }

  async findOne(id: number) {

    const contact = await this.contactFormRepo.findOne({ where: { id } });
    
    if(!contact) {
      throw new BadGatewayException('contact not found');
    }
    
    return contact;
    
  }

  async update(id: number, updateContactFormDto: UpdateContactFormDto) {

    const contact = await this.contactFormRepo.findOne({ where: { id } });
    
    if(!contact) {
      throw new BadGatewayException('contact not found');
    }

    Object.assign(contact, updateContactFormDto);

    await this.contactFormRepo.save(contact);

    return contact;
  }

  async remove(id: number) {

    const contact = await this.contactFormRepo.findOne({ where: { id } });
    
    if(!contact) {
      throw new BadGatewayException('contact not found');
    }

    await this.contactFormRepo.remove(contact);

    return { message: `contact with ${id} deleted successfully ✅` };
  }
}
