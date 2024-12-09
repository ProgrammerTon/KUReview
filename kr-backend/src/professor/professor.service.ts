import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProfessorDto } from './dto/create-professor.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import Professor from './professor.entity';
import Review from './review.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectRepository(Professor)
    private professorRepository: Repository<Professor>,
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
  ) {}

  async findAll(): Promise<Professor[]> {
    /*
        this.coursesRepository.save(
            {
                "number": "01204211",
                "title": "Discrete"
            }
        )
        */
    //const data = await this.coursesRepository.find()
    //console.log(data)
    return this.professorRepository.find();
  }
  async create(createProfessorDto: CreateProfessorDto) {
    return this.professorRepository.save(createProfessorDto);
  }
  async findAllReviews(): Promise<Review[]> {
    return this.reviewsRepository.find();
  }
  /*
    async findAllReviews(courseId: string): Promise<Review[]> {
        return this.reviewsRepository.find();
    }
        */
  async findReviewById(professorId: ObjectId): Promise<Review[]> {
    return this.reviewsRepository.find({ where: { professorId: professorId } });
  }
  async createReview(createReviewDto: CreateReviewDto) {
    //const courseId = new ObjectId(createReviewDto.courseId);
    let newReview: any = {...createReviewDto};
    newReview.courseId = new ObjectId(createReviewDto.professorId);
    return this.reviewsRepository.save(newReview);
  }
  /*
  async createReview(courseId: ObjectId): Promise<Review> {
    return this.reviewsRepository.save({
      comments: 'besthod',
      score: 5,
      courseId: courseId,
    });
  }
    */
}