import React, {useState,useEffect} from 'react';
import './App.css';
import { Professor } from './interfaces';
import ProfessorItem from './components/ProfessorItem';
import NewProfessorForm from './components/NewProfessorForm';
import ProfessorService from './services/ProfessorService';

const App = () => {
  const [professor, setProfessor] = useState<Professor[]>([]);
  const [formVisible, setFormVisible] = useState<boolean>(false);

  const toggleFormVisible = () =>{
    setFormVisible(!formVisible);
  };

  const fetchProfessor = () => {
    ProfessorService.fetchProfessor()
    .then(professor => {
      setProfessor(professor);
    });
  };

  const handleNewProfessorCreated = (professor: Professor) => {
    fetchProfessor();
    setFormVisible(false);
  }


  useEffect(() => {
    fetchProfessor();
  },[]);

  return (
    <div className="App">
      {/*
      <ul>
      {professor.map((item) => (
        <ProfessorItem key={item.id} professor={item}/>
      ))}
      </ul>
*/}
      <button onClick={toggleFormVisible}>เพิ่มอาจารย์</button>
      {formVisible &&
        <NewProfessorForm onNewProfessorCreated={handleNewProfessorCreated} />
      }
    </div>
  );
}
/*
type AppState = {
  message : string;
};

class App extends React.Component<{}, AppState> {
  state: AppState = {
    message: 'Default message',
  };

  componentDidMount(){
    fetch('http://localhost:3000/courses')
      .then(res => res.json())
      .then(obj => {
        this.setState({message: obj.message});
      });
  }

  render() {
    return (
      <div>
        {this.state.message}
      </div>
    );
  }
}
*/
export default App;
