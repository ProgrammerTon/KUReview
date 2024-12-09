import React, {useState} from 'react';
import { Professor } from '../interfaces';
import ProfessorService from '../services/ProfessorService';

type NewProfessorFormProps = {
    onNewProfessorCreated?: (newProfessor: Professor) => void,
};

const NewProfessorForm = (props: NewProfessorFormProps) => {
    const [newProfessorNumber,setNewProfessorNumber] = useState<string>('');
    const [newProfessorTitle,setNewProfessorTitle] = useState<string>('');
    const handleNewProfessorNumberChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setNewProfessorNumber(e.target.value)
    }
    const handleSave = () => {
        const  newProfessor = {
            number: newProfessorNumber,
            title: newProfessorTitle,
        };
        ProfessorService.createProfessor(newProfessor)
            .then(savedNewProfessor => {
                if (savedNewProfessor !== null){
                    if(props.onNewProfessorCreated !== undefined){
                        props.onNewProfessorCreated(savedNewProfessor);
                    }
                }else{
                    alert("Save Error");
                }  
            });
    };
    return (
        <div>
        Number: <input value={newProfessorNumber} onChange={handleNewProfessorNumberChange}/><br/>
        Title: <input value={newProfessorTitle} onChange={(e) => {setNewProfessorTitle(e.target.value);}}/><br/>
        <button onClick={handleSave}>Save</button>
        </div>
    )
};
export default NewProfessorForm;
