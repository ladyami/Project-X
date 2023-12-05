import { useEffect, useReducer } from 'react';
import './App.css';
import Header from './Header';
import MainApp from './MainApp';
import Loader from './Loader';
import Error from './Error'
import StartScreen from './StartScreen';

//import DateCounter from './DateCounter'

const initialState = {
  questions:[], 
  status: 'loading', 

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
  default: 
  throw new Error('Action unkonwn');
}
}

function App() {

 const [{questions, status}, dispatch] = useReducer(reducer,  initialState)
  
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
      {status === 'ready' && <StartScreen numQuestions={numQuestions}/>}
     </MainApp>
    </div>
  )
}

export default App

