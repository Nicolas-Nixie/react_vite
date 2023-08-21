import './App.css';
import React, { useState, useEffect } from 'react';
import { getShoes } from './config/shoes';

const App = () => {
  const [loading, setLoading] = useState(false)
  const [shoes, setshoes] = useState([])

  const fetchData = async () => {
    setLoading(true)

    const res = await getShoes()
    setshoes([...res])
    setLoading(false)
    console.log('response: ', res)
  }
  
  useEffect(() => {
    fetchData()
    .then((response) => response())
    .then((result) => {
      setshoes(result);
      console.log(result);
    });
  }, [])


  const clickmarque = (id) => {

  }

  


  return (
    <div className="App">
      <h1 className='m-5'>shoes</h1>
        
      {shoes.map(shoe => (
        <button className='btn m-3' onClick={clickmarque(shoe.id)} >{shoe.nom} cree en {shoe.annee} par {shoe.creator}</button>
        ))}

    
        
        
    </div>
  );

} 

export default App;