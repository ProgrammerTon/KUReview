import React, {useState} from 'react';
import {Course,Review} from '../interfaces';
import CoursesService from '../services/CoursesService';
import { clear } from 'console';

type CourseItemProps = {
    course: Course,
};

const CourseItem = (props: CourseItemProps) => {
    const course: Course = props.course;
    
    const [reviewsVisible, setReviewsVisible] = useState<boolean>(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReviewComments, setNewReviewComments] = useState<string>('');
    const [newReviewScore, setNewReviewScore] = useState<number>(1);

    const fetchReviews = () => {
        if (course.id){
            CoursesService.fetchReviews(course.id)
            .then(reviews => {
                setReviews(reviews);
        });
        }
    }
    const handleReviewsVisibleToggle = () => {
        if (!reviewsVisible){
            fetchReviews();
            setReviewsVisible(true);
        }else{
            setReviewsVisible(false);
        }
        
        
    }

    const clearNewReviewForm = () => {
        setNewReviewComments('');
        setNewReviewScore(1);
    };

    const handleNewReviewSave = () =>{
        const newReview: Review = {
            comments: newReviewComments,
            score: newReviewScore,
        };
        if (course.id){
            CoursesService.createReview(newReview, course.id)
            .then(savedNewReview => {
                if (savedNewReview) {
                    fetchReviews();
                    clearNewReviewForm();
                }
            })
        }
        //alert(`${newReviewComments} --- ${newReviewScore}`)
    }
    const newReviewScoreOptions = [1,2,3,4,5];
    return (
        <li className="Course">
            {course.number} - {course.title}
            &nbsp;
            <button onClick={handleReviewsVisibleToggle}>
                {reviewsVisible ? 'hide reviews' : 'show reviews'}    
            </button>    
            {reviewsVisible && 
                (
                  <div>
                  <ul>
                    {reviews.map(review => (
                        <li>{review.comments} ({review.score})</li>
                    ))}
                    {reviews.length === 0 &&
                    (
                        <li>No reviews</li>
                    )
                    }
                  </ul>
                  <b>New review:</b><br/>
                  Comments: &nbsp;
                  <input 
                        onChange={(e) => {setNewReviewComments(e.target.value);}}
                        value={newReviewComments}/>
                    &nbsp; Score &nbsp;
                    <select 
                        onChange={(e) => {setNewReviewScore(parseInt(e.target.value,10));}}
                        value={newReviewScore}>
                        {newReviewScoreOptions.map(item => (
                            <option value = {item}>{item}</option>
                        ))}
                    </select>
                    &nbsp;
                    <button onClick={handleNewReviewSave}>Save</button>
                  </div>

                )
            }
        </li>
    );
};
export default CourseItem;
