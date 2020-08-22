import React, {useState} from 'react';
import axios from 'axios';
import sha256 from 'sha256';
import {BounceLoader} from 'react-spinners';
import './App.css';

const App = () => {
  const [image, setImage] = useState('');
  const [hashInput, setHashInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setHashInput(e.target.value);
  }
  const handleClick = () =>{
    setLoading(true);
    axios.post('http://165.232.53.236/hash', {
      hash: sha256(hashInput)
    })
    .then(function (response) {
      console.log(response);
      setImage(response.data);
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false);
    });
  }

  useState(()=>{
    setLoading(true);
    axios.post('/hash', {
      hash: sha256(hashInput)
    })
    .then(function (response) {
      console.log(response);
      setImage(response.data);
      setLoading(false);
    })
    .catch(function (error) {
      console.log(error);
      setLoading(false);
    });
  },[]);
  return (
    <div className="App">
      <div className="infoContainer">
        <div className="innerInfoContainer">
          <h1>SINERGI</h1>
          <input onChange={handleChange} value={hashInput}></input>
          <button onClick={handleClick}>Generate</button>
        </div>
      </div>
      <div className="imgContainer">
        {loading ? <BounceLoader /> : <img src={`${image}`} className="image"/>}
      </div>
    </div>
  );
}

export default App;
