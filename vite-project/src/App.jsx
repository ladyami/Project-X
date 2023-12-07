import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './component/Header';
import MainApp from './component/MainApp';
import Loader from './component/Loader';
import Error from './component/Error'
import StartScreen from './component/StartScreen';
import Question from './component/Question';

//import DateCounter from './DateCounter'

const initialState = {
  questions:[], 
  status: 'loading', 
  index: 0,
  answer: null,
  points: 0,

};

function reducer(state, action) {
switch (action.type) {
  case 'dataReceived' : 
  return {
    ...state, questions: action.payload, status: "ready",
  };

  case 'dataFailed' :
    return{
      ...state, status: "error",
    };
    case 'start' :
      return{
        ...state, status: "active",
      };
    
      case 'newAnswer' :
        const question = state.questions.at(state.index);
        
        return{
          ...state, 
          answer: action.payload,
          points: action.payload === question.correctOption ? state.points + question.points : state.points,

        };

        
  default: 
  throw new Error('Action unkonwn');
}
}

function App() {

 const [{questions, status, index, answer}, dispatch] = useReducer(reducer,  initialState)
  
 const numQuestions = questions.length;

 useEffect(function (){
  fetch('http://localhost:9000/questions')
  .then((res) => res.json())
  .then((data)=> dispatch({type: 'dataReceived', payload: data }))
  .catch((err) => dispatch({type: 'dataFailed'}));
 }, []);

  return (
    <div className='app'>
     <Header/>
     <MainApp >
      {status === 'loading' && <Loader/>}
      {status === 'error' && <Error/>}
      {status === 'ready' && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
      {status === "active" && <Question question={questions[index]} dispatch={dispatch} answer={answer}/>}
     </MainApp>
    </div>
  )
}

export default App

