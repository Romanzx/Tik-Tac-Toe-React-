import { useState } from 'react'
import './App.css'

export default function Board() {
  const [xStepNext, setXStepNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill())
  function Cell({value, OnClickFuc}){
    return(
      <button className='square' onClick={OnClickFuc}>
        {value}
      </button>
    )
  }
  function Restart({onClickRest}){
    return(
      <button className='restart' onClick={onClickRest}>
        restart
      </button>
    )
  }
  function restartClick(){
    const nullArr = Array(9).fill(null)
    setSquares(nullArr)
    setXStepNext(true)
  }
  function handClick(i){
    if(squares[i] || calcWinner(squares)){
      return
    }
    const newSquareValue = squares.slice();
    if(xStepNext){
      newSquareValue[i] = 'X'
    }else{
      newSquareValue[i] = '0'
    }
    setSquares(newSquareValue)
    setXStepNext(!xStepNext)
  }
  function calcWinner(squares){
    const winCond = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [2,4,6],
      [0,4,8],
    ];
    for(let i = 0; i<winCond.length;i++){
      const [a, b, c] = winCond[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
        return (squares[a])
      }
    }
    return null
  }
  let status;
  const winner = calcWinner(squares);
  if(winner){
    status =  'Winner ' + winner;
  }else{
    status = 'Next step: '  + (xStepNext ? 'X' : '0') 
  }

  return (
    <>
      <div className="up-cont">
        <div className="status">{status}</div>
        <Restart onClickRest={restartClick}/>
      </div>
      <div className="board-row">
        <Cell value={squares[0]} OnClickFuc={() => handClick(0)}/>
        <Cell value={squares[1]} OnClickFuc={() => handClick(1)}/>
        <Cell value={squares[2]} OnClickFuc={() => handClick(2)}/>
      </div>
      <div className="board-row">
        <Cell value={squares[3]} OnClickFuc={() => handClick(3)}/>
        <Cell value={squares[4]} OnClickFuc={() => handClick(4)}/>
        <Cell value={squares[5]} OnClickFuc={() => handClick(5)}/>
      </div>
      <div className="board-row">
        <Cell value={squares[6]} OnClickFuc={() => handClick(6)}/>
        <Cell value={squares[7]} OnClickFuc={() => handClick(7)}/>
        <Cell value={squares[8]} OnClickFuc={() => handClick(8)}/>
      </div>
    </>
  )
}
