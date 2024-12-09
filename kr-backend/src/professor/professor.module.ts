import { Module } from '@nestjs/common';
//import { CourseService } from './course.service';
//import { CourseController } from './course.controller';
import { ProfessorService } from './professor.service';
import { ProfessorController } from './professor.controller';
import Professor from './professor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Review from './review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Professor, Review])],
  providers: [ProfessorService],
  controllers: [ProfessorController],
})
/*
@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
})
  */
export class ProfessorModule {}