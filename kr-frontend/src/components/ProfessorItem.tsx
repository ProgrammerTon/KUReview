import React, {useState} from 'react';
import {Professor,Review} from '../interfaces';
import ProfessorService from '../services/ProfessorService';
import { clear } from 'console';

type ProfessorItemProps = {
    professor: Professor,
};

const ProfessorItem = (props: ProfessorItemProps) => {
    const professor: Professor = props.professor;
    
    const [reviewsVisible, setReviewsVisible] = useState<boolean>(false);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [newReviewComments, setNewReviewComments] = useState<string>('');
    const [newReviewScore, setNewReviewScore] = useState<number>(1);

    const fetchReviews = () => {
        if (professor.id){
            ProfessorService.fetchReviews(professor.id)
            .then(professor => {
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
        if (professor.id){
            ProfessorService.createReview(newReview, professor.id)
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
        <li className="Professor">
            {professor.number} - {professor.title}
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
export default ProfessorItem;
