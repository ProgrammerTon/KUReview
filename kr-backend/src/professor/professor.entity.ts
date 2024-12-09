import { Entity, Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class Professor {
    @ObjectIdColumn()
    id?: ObjectId;

    @Column()
    number: string;

    @Column()
    title: string;
}
export default Professor;
