import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Param,
} from '@nestjs/common';
import Course from './course.entity';
//import {CoursesService} from './courses.service';
import { CoursesService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import Review from './review.entity';
import { ObjectId } from 'mongodb';


@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get()
  async findAll(): Promise<Course[]> {
    return this.coursesService.findAll();
  }

  @Post()
  async create(@Body() createCourseDto: CreateCourseDto) {
    if (
      createCourseDto.number !== undefined &&
      createCourseDto.title !== undefined
    ) {
      const newCourse = this.coursesService.create(createCourseDto);
      return newCourse;
    } else {
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/reviews')
  async findAllReviews(): Promise<Review[]> {
    return this.coursesService.findAllReviews();
  }

  @Get(':courseId/reviews')
  async findReview(@Param('courseId') courseId: string): Promise<Review[]> {
    const objectId = new ObjectId(courseId);
    return this.coursesService.findReviewById(objectId);
  }

  @Post(':courseId/reviews')
  async createReview(@Param('courseId') courseId:string,
                     @Body() createReviewDto: CreateReviewDto) {
    if (
      createReviewDto.score !== undefined &&
      createReviewDto.comments !== undefined
    ) {
      createReviewDto.courseId = courseId;
      const newReview = this.coursesService.createReview(createReviewDto);
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