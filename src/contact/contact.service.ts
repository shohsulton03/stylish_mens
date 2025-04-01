import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateContactDto } from "./dto/create-contact.dto";
import { UpdateContactDto } from "./dto/update-contact.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Contact } from "./entities/contact.entity";
import { Repository } from "typeorm";

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) private readonly contactRepo: Repository<Contact>
  ) {}

  async create(createContactDto: CreateContactDto) {
    const check_phone_num = await this.contactRepo.findOne({where : {phone_number : createContactDto.phone_number}})
    if (check_phone_num) {
      throw new BadRequestException("Bunday contact mavjud");
    }
    const check_email = await this.contactRepo.findOne({where : {email : createContactDto.email}})
    if (check_email) {
      throw new BadRequestException("Bunday contact mavjud");
    }

    const newContact = this.contactRepo.create(createContactDto);
    await this.contactRepo.save(newContact);

    return newContact;
  }

  async findAll() {
    return this.contactRepo.find();
  }

  async findOne(id: number) {
    const contact = await this.contactRepo.findOne({ where: { id } });
    if (!contact) {
      throw new BadRequestException("contact not found");
    }
    return contact;
  }

  async update(id: number, updateContactDto: UpdateContactDto) {
    const contact = await this.contactRepo.findOne({ where: { id } });
    if (!contact) {
      throw new BadRequestException("Bunday contact mavjud emas");
    }

    if (
      updateContactDto.phone_number &&
      updateContactDto.phone_number !== contact.phone_number
    ) {
      const checkPhoneNum = await this.contactRepo.findOne({
        where: { phone_number: updateContactDto.phone_number },
      });
      if (checkPhoneNum) {
        throw new BadRequestException("Bunday telefon raqam mavjud");
      }
    }

    if (updateContactDto.email && updateContactDto.email !== contact.email) {
      const checkEmail = await this.contactRepo.findOne({
        where: { email: updateContactDto.email },
      });
      if (checkEmail) {
        throw new BadRequestException("Bunday email mavjud");
      }
    }

    await this.contactRepo.update(id, updateContactDto);

    return this.contactRepo.findOne({ where: { id } });
  }

  async remove(id: number) {
    const contact = await this.contactRepo.findOne({ where: { id } });
    if (!contact) {
      throw new BadRequestException("contact not found");
    }
    await this.contactRepo.delete(id);
    return { message: `Contact with ${id} deleted succesfully` };
  }
}
