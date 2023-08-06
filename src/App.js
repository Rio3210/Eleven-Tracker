import { useEffect, useState } from 'react';
import './App.css';


function App() {
  const[name,setName]=useState(''); 
  const[datetime,setDateTime]=useState('');
  const[description,setDescription]=useState('');
  const [transactions,setTransactions]=useState([]);
  useEffect(()=>{
    getTransaction().then(setTransactions)
  },[])

  async function getTransaction(){
    const url=process.env.REACT_APP_URL+'/transactions'
    const response= await fetch(url);
    return await response.json();
  }

  function addNewTransaction(event){
    event.preventDefault();
    const url=process.env.REACT_APP_URL +'/transaction';
    const price=name.split(" ")[0];
    fetch(
      url,
      {
        method:'POST',
        headers:{'content-type':'application/json'},
        body:JSON.stringify(
          { price,
            name:name.substring(price.length+1),
            description,
            datetime,
          })
      }
    ).then(response=>{
      response.json().then(json =>{
        setName('');
        setDateTime('');
        setDescription('');
        console.log(json);
      })
    })
  }
  let balance=0;
  transactions.forEach((transaction) => {
    balance = balance + transaction.price;
  });
  balance=balance.toFixed(2);
  const fraction=balance.split(".")[1]
  balance=balance.split('.')[0]

  return (
    <main>
      <h1>{balance}<span>{fraction}</span></h1>
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
      {transactions.length > 0 &&
      transactions.map((transaction) => (
        <div className="transaction" key={transaction.id}>
          <div className="left">
            <div className="name">{transaction.name}</div>
            <div className="description">{transaction.description}</div>
          </div>
          <div className="right">
            <div className={'price ' + (transaction.price < 0 ? 'red' : 'green')}>
              {transaction.price}
            </div>
            <div className="datetime">2023-08-4 10:59</div>
          </div>
        </div>
      ))
    }
        
        
      </div>
    </main>
    );
}

export default App;
