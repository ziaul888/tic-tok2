import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'

const initMatrix = [];
function App() {
  const [matrix, setMatrix] = useState(initMatrix);
  const [matrixSize, setMatrixSize] = useState(3);
  const [currentPlayer, setCurrentPlayer] = useState('o');
  const [selR, setSelR ] = useState(null);
  const [selC,setSelC] = useState(null)
  const[winner, setWinner] = useState(false); 


  useEffect(()=>{
    const row = new Array (matrixSize).fill(null);
    const tempMatrix = [];
    

    for (let i =0; i<matrixSize; i++){
      tempMatrix.push([...row])
    }
    setMatrix(tempMatrix);
  },[]);



    
  function squreClick(r,c){
   if (!matrix[r][c] && !winner){
     setSelC(c)
     setSelR(r)
    let nextPlayer=currentPlayer === "x" ? "o" :"x"
     setCurrentPlayer(nextPlayer);
     const matrixCopy= [...matrix];
     matrixCopy[r][c]=nextPlayer;
     setMatrix(matrixCopy);
   }
  }




  function isWinner() {
    let vertical = true;
    let horizontal = true;
    let d1 = true;
    let d2 = true;

    if (selC === null || selR === null) {
      return;
    }

    for (let i = 0; i < matrixSize; i++) {
     
      if (matrix[i][selC] !== currentPlayer) {
        vertical = false;
      }
      if (matrix[selR][i] !== currentPlayer) {
        horizontal = false;
      }

      if (matrix[i][i] !== currentPlayer) {
        d1 = false;
      }

      if (matrix[i][matrixSize - i - 1] !== currentPlayer) {
        d2 = false;
      }

    }
    if (vertical || horizontal || d1 || d2) {
      setWinner(true);
    }
  }





   useEffect(() => {
     if(!winner){
       isWinner();
     }
   }, )
   
  return (
    <div className="App">
      <header className="App-header">
      <div>
          {
            matrix.map((val, c)=>(
              <div className='c'>
                {val.map((val, r)=>(
                  <div onClick={()=>{squreClick(r,c)}} className="r">
                    {matrix[r][c]}
                  </div>
                ))}
              </div>
            ))  
          }
          </div>
          <h2>{winner ? `Player ${currentPlayer} is a winner` : ""}</h2>
      </header>
    </div>
  );
}

export default App;
