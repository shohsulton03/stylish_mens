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

  @ApiOperation({ summary: 'Contact form'})
  @ApiResponse({ 
    status: 201, 
    description: 'Created', 
    type: ContactForm 
  })
  @Post()
async create(@Body() createOrderDto: CreateContactFormDto) {
    try {
        const newOrder = await this.contactFormService.create(createOrderDto);

        return {
            success: true,
            message: 'Xabar telegram botga junatildi!',
            data: newOrder,
        };
    } catch (error) {
        throw new BadRequestException('Xabarnoma yaratishda xatolik yuz berdi!');
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
