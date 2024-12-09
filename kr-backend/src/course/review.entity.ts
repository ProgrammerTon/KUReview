import { Entity, Column, ObjectIdColumn } from 'typeorm';
import {ObjectId} from 'mongodb';

@Entity()
export class Review {
    @ObjectIdColumn()
    id?: ObjectId;

    @Column()
    comments: string;

    @Column()
    score: number;

    @Column()
    courseId: ObjectId;
}
export default Review;