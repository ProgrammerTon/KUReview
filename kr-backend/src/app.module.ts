import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { CoursesController} from './courses.controller';
//import { CoursesService} from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CourseModule } from './course/course.module';
import Course from './course/course.entity';
import Review from './course/review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: "mongodb+srv://ProgrammerTon:1234@cluster0.z51ft.mongodb.net/",
      database: 'test1',
      entities: [Course, Review],
    }),
    /*
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: "mongodb+srv:best:best@cluster0.i9ydoci.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
      //best:best@cluster0.i9ydoci.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0,
      database : "test02",
      entities: [Course],
      //synchronize: true,
    }),
    */

    TypeOrmModule.forFeature([Course]),
    CourseModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
