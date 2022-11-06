import React from 'react';
import Die from './components/Die';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti'

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
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const heldCondition = diceValues.every(die => die.isHeld);
    const dieValue = diceValues[0].value;
    const valueCondition = diceValues.every(die => die.value === dieValue)

    if (heldCondition && valueCondition) {
      setTenzies(true);
      console.log('You have won the game!')
    } 

  }, [diceValues])

  const diceElements = diceValues.map(x => <Die value={x.value} isHeld={x.isHeld} key={x.id} id={x.id} holdDie={holdDie}/>);

  function rollDice() {
    if (tenzies) {
      setDiceValues(allNewDice());
      setTenzies(false);
    } else {
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
      { tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
      <p className="description">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="dice">
        {diceElements}
      </div>
      <button className="btn" onClick={rollDice}>{tenzies? 'New Game' : 'Roll'}</button>
    </main>
  );
}