import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { CoursesController} from './courses.controller';
//import { CoursesService} from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfessorModule } from './professor/professor.module';
import Professor from './professor/professor.entity';
import Review from './professor/review.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: "mongodb+srv://ProgrammerTon:1234@cluster0.z51ft.mongodb.net/",
      database: 'test1',
      entities: [Professor, Review],
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

    TypeOrmModule.forFeature([Professor]),
    Professor
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
