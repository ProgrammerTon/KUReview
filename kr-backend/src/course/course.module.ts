import { Module } from '@nestjs/common';
//import { CourseService } from './course.service';
//import { CourseController } from './course.controller';
import { CoursesService } from './course.service';
import { CoursesController } from './course.controller';
import Course from './course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import Review from './review.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Review])],
  providers: [CoursesService],
  controllers: [CoursesController],
})
/*
@Module({
  controllers: [CoursesController],
  providers: [CoursesService],
})
  */
export class CourseModule {}