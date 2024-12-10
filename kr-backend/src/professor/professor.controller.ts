import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import Course from './professor.entity';
//import {CoursesService} from './courses.service';
import { ProfessorService } from './professor.service';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import Review from './review.entity';
import { ObjectId } from 'mongodb';


@Controller('professor')
export class ProfessorController {
  constructor(private professorService: ProfessorService) {}

  @Get()
  async findAll(): Promise<Course[]> {
    return this.professorService.findAll();
  }

  @Post()
  async create(@Body() createProfessorDto: CreateProfessorDto) {
    if (
      createProfessorDto.number !== undefined &&
      createProfessorDto.title !== undefined
    ) {
      const newProfessor = this.professorService.create(createProfessorDto);
      return newProfessor;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/reviews')
  async findAllReviews(): Promise<Review[]> {
    return this.professorService.findAllReviews();
  }

  @Get(':professorId/reviews')
  async findReview(@Param('professorId') professorId: string): Promise<Review[]> {
    const objectId = new ObjectId(professorId);
    return this.professorService.findReviewById(objectId);
  }

  @Post(':professorId/reviews')
  async createReview(@Param('professorId') professorId:string,
                     @Body() createReviewDto: CreateReviewDto) {
    if (
      createReviewDto.score !== undefined &&
      createReviewDto.comments !== undefined
    ) {
      createReviewDto.professorId = professorId;
      const newReview = this.professorService.createReview(createReviewDto);
      return newReview;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  /*
  @Post(':courseId/reviews')
  async createReview(@Param('courseId') courseId: string): Promise<Review> {
    const objectId = new ObjectId(courseId);
    return this.coursesService.createReview(objectId);
  }
    */
}