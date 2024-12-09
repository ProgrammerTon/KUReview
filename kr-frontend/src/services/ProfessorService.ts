import { Professor,Review } from "../interfaces";
import { baseUrl } from "../config/const";

export async function fetchProfessor():Promise<Professor[]> {
    const res = await fetch(`${baseUrl}/professor`);
    const professor = await res.json();
    return professor;
}

async function createProfessor(newProfessor: Professor): Promise<Professor|null>{
  const res = await fetch(`${baseUrl}/professor`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newProfessor),
  })
  const savedNewProfessor : Professor= await res.json();
  if (savedNewProfessor.id !== undefined){
    return savedNewProfessor;
  }else{
    return null;
  }  
}

export async function fetchReviews(professorId: string): Promise<Review[]> {
  const res = await fetch(`${baseUrl}/professor/${professorId}/reviews`);
  const reviews = await res.json();
  return reviews;
}

async function createReview(newReview: Review, professorId: string): Promise<Review|null>{
  const res = await fetch(`${baseUrl}/professor/$${professorId}/reviews`,{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(newReview),
  })
  const savedNewReview : Review = await res.json();
  if (savedNewReview.id !== undefined){
    return savedNewReview;
  }else{
    return null;
  }  
}

export default {
  fetchProfessor,  
  createProfessor,
  fetchReviews,
  createReview,
};