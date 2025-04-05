import { Controller, Get, Post, Body, Patch, Param, Delete, BadRequestException } from '@nestjs/common';
import { ContactFormService } from './contact_form.service';
import { CreateContactFormDto } from './dto/create-contact_form.dto';
import { UpdateContactFormDto } from './dto/update-contact_form.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContactForm } from './entities/contact_form.entity';

@ApiTags('contact_from')
@Controller('contact-form')
export class ContactFormController {
  constructor(
    private readonly contactFormService: ContactFormService
  ) {}

  @ApiOperation({ summary: 'Create contact form' })
  @ApiResponse({ 
    status: 201, 
    description: 'Contact form created successfully', 
    type: ContactForm 
  })
  @Post()
async create(@Body() createContactFormDto: CreateContactFormDto) {
  try {
    // Create the contact form and send it to the Telegram bot
    const newContactForm = await this.contactFormService.create(createContactFormDto);
    return {
      success: true,
      message: '✅ Xabar telegram botga junatildi!',
      data: newContactForm,
    };
  } catch (error) {
    console.error('❌ Error creating contact form:', error);
    throw new BadRequestException({
      message: 'Xabarnoma yaratishda xatolik yuz berdi!',
      error: error.message,
      statusCode: 400,
    });
  }
}

  @ApiOperation({ summary: 'Get all contact forms'})
  @ApiResponse({
    status: 200,
    description: 'All contact forms',
    type: [ContactForm],
  })
  @Get()
  findAll() {
    return this.contactFormService.findAll();
  }


  @ApiOperation({ summary: 'Get contact form by id'})
  @ApiResponse({
    status: 200,
    description: 'Get contact form by id',
    type: ContactForm,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactFormService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update contact form by id'})
  @ApiResponse({
    status: 200,
    description: 'Update by Id',
    type: ContactForm,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactFormDto: UpdateContactFormDto) {
    return this.contactFormService.update(+id, updateContactFormDto);
  }

  @ApiOperation({ summary: 'Delete contact form by id'})
  @ApiResponse({
    status: 200,
    description: 'Delete by Id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactFormService.remove(+id);
  }
}
