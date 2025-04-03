import { PartialType } from '@nestjs/swagger';
import { CreateContactFormDto } from './create-contact_form.dto';

export class UpdateContactFormDto extends PartialType(CreateContactFormDto) {}
