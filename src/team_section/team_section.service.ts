import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateTeamSectionDto } from "./dto/create-team_section.dto";
import { UpdateTeamSectionDto } from "./dto/update-team_section.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { TeamSection } from "./entities/team_section.entity";
import { Repository } from "typeorm";
import { FileService } from "../file/file.service";

@Injectable()
export class TeamSectionService {
  constructor(
    @InjectRepository(TeamSection)
    private readonly teamSectionRepository: Repository<TeamSection>,
    private readonly fileService: FileService
  ) {}

  async create(createTeamSectionDto: CreateTeamSectionDto, file: any) {
    const image = await this.fileService.saveFile(file);
    createTeamSectionDto.image = image;

    const newTeamSection =
      this.teamSectionRepository.create(createTeamSectionDto);
    return this.teamSectionRepository.save(newTeamSection);
  }

  async findAll() {
    return this.teamSectionRepository.find({ order: { id: 'ASC' } });
  }

  async findOne(id: number) {
    const teamSection = await this.teamSectionRepository.findOneBy({ id });
    if (!teamSection) {
      throw new BadRequestException("Team section not found");
    }
    return teamSection;
  }

  async update(id: number, updateTeamSectionDto: UpdateTeamSectionDto, file: any) {
    const teamSection = await this.teamSectionRepository.findOneBy({ id });
    if (!teamSection) {
      throw new BadRequestException("Team section not found");
    }
    if (file) {
      await this.fileService.deleteFile(teamSection.image);
      const image = await this.fileService.saveFile(file);
      updateTeamSectionDto.image = image;
    }
    await this.teamSectionRepository.update(id, updateTeamSectionDto);
    return this.teamSectionRepository.findOneBy({ id });
  }

  async remove(id: number) {
    const teamSection = await this.teamSectionRepository.findOneBy({ id });
    if (!teamSection) {
      throw new BadRequestException("Team section not found");
    }
    await this.fileService.deleteFile(teamSection.image)
    await this.teamSectionRepository.delete({ id });
    return `This action removes a ${id} teamSection`;
  }
}
