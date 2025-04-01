import { Module } from '@nestjs/common';
import { TeamSectionService } from './team_section.service';
import { TeamSectionController } from './team_section.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamSection } from './entities/team_section.entity';
import { FileModule } from '../file/file.module';

@Module({
  imports: [TypeOrmModule.forFeature([TeamSection]), FileModule],
  controllers: [TeamSectionController],
  providers: [TeamSectionService],
})
export class TeamSectionModule {}
