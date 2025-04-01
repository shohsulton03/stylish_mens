import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { ContactService } from "./contact.service";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Contact } from "./entities/contact.entity";

@ApiTags("Contact")
@Controller("contact")
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @ApiOperation({ summary: "Add new contact" })
  @ApiResponse({
    status: 201,
    description: "Added",
    type: Contact,
  })
  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactService.create(createContactDto);
  }

  @ApiOperation({ summary: "Get all data" })
  @ApiResponse({
    status: 200,
    description: "All contact value",
    type: [Contact],
  })
  @Get()
  findAll() {
    return this.contactService.findAll();
  }

  @ApiOperation({ summary: "Get one data by Id" })
  @ApiResponse({
    status: 200,
    description: "Get one by Id",
    type: Contact,
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.contactService.findOne(+id);
  }

  @ApiOperation({ summary: "Update one data by Id" })
  @ApiResponse({
    status: 200,
    description: "Update by Id",
    type: Contact,
  })
  @Patch(":id")
  update(@Param("id") id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactService.update(+id, updateContactDto);
  }

  @ApiOperation({ summary: "Delete self" })
  @ApiResponse({
    status: 200,
    description: "Delete self",
    type: Object,
  })
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.contactService.remove(+id);
  }
}
