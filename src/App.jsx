import Die from './components/Die';
import React from 'react';
import {nanoid} from 'nanoid';

export default function App() {

  function allNewDice() {
    const dice = [];

    for (let i = 0; i < 10; i++) {
      const currentDie = {
        value: Math.floor(Math.random() * 6) + 1,
        isHeld: false,
        id: nanoid()
      }

      dice.push(currentDie);
    }

    return dice;
  }

  const [diceValues, setDiceValues] = React.useState(allNewDice());

  const diceElements = diceValues.map(x => <Die value={x.value} isHeld={x.isHeld} key={x.id} id={x.id} holdDie={holdDie}/>);

  function rollDice() {
    setDiceValues(oldValues => oldValues.map(x => {
      return !x.isHeld 
        ? {
            ...x,
            value: Math.floor(Math.random() * 6) + 1,
            id: nanoid()
          }
        : x
    }))
  }

  function holdDie(event, id) {
    setDiceValues(oldValues => oldValues.map(x => {
      return x.id === id
        ? {...x, isHeld: !x.isHeld}
        : x
    }))   
  }

  return (
    <main className="app">
      <h1 className="title">Tenzies</h1>
      <p className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice">
        {diceElements}
      </div>
      <button className="btn" onClick={rollDice}>Roll</button>
    </main>
  );
}