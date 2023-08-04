import { useState } from 'react';
import './App.css';


function App() {
  const[name,setName]=useState(''); 
  const[datetime,setDateTime]=useState('');
  const[description,setDescription]=useState('');
  function addNewTransaction(event){
    event.preventDefault();
    const url=process.env.REACT_APP_URL +'/transaction';
    
    fetch(
      url,
      {
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify({name,description,datetime})
      }
    ).then(response=>{
      response.json().then(json =>{
        console.log(json);
      })
    })
  }

  return (
    <main>
      <h1>400 <span>.00</span></h1>
      <form onSubmit={addNewTransaction}>
        <div className='basics'>
        <input type="text"
        value={name}
        onChange={event =>setName(event.target.value)}
         placeholder='+300 earphone'></input>
        <input 
        value={datetime}
        onChange={event=>setDateTime(event.target.value)}
        type='datetime-local'></input>
        </div>
        <div className='description'>
          <input type='text'
          value={description}
          onChange={event=>setDescription(event.target.value)}
           placeholder='description'/>
        </div>
        <button type='submit'>Add transaction</button>
      </form>
      <div className='transactions'>
        <div className='transaction'>
          <div className='left'>
            <div className='name'>Earphone</div>
            <div className='description'>It was cheap</div>
          </div>
          <div className='right'>
            <div className='price red'>-$300</div>
            <div className='datetime'>2023-08-4 10:59</div>
      
          </div>
        </div>
        <div className='transaction'>
          <div className='left'>
            <div className='name'>Remote Job</div>
            <div className='description'>It was cheap</div>
          </div>
          <div className='right'>
            <div className='price green'>+$600</div>
            <div className='datetime'>2023-08-4 10:59</div>
      
          </div>
        </div>
        <div className='transaction'>
          <div className='left'>
            <div className='name'>New Keyboard</div>
            <div className='description'>It was cheap</div>
          </div>
          <div className='right'>
            <div className='price red'>-$200</div>
            <div className='datetime'>2023-08-4 10:59</div>
      
          </div>
        </div>
      </div>
    </main>
    );
}

export default App;
