import { useEffect, useReducer } from 'react'
import './App.css'
import Header from './Header';
import MainApp from './MainApp';

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

 const [state, dispatch] = useReducer(reducer,  initialState)
  
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
      <p>1/15</p>
      <p>Question</p>
     </MainApp>
    </div>
  )
}

export default App

