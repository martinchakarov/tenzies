import Die from './components/Die';
import React from 'react';

export default function App() {

  function allNewDice() {
    const dice = [];

    for (let i = 0; i < 10; i++) {
      dice.push(Math.floor(Math.random() * 6) + 1);
    }

    return dice;
  }

  const [diceValues, setDiceValues] = React.useState(allNewDice());

  const diceElements = diceValues.map(x => <Die value={x}/>);

  function rollDice() {
    setDiceValues(allNewDice())
  }

  return (
    <main className="app">
      <div className="dice">
        {diceElements}
      </div>
      <button className="btn" onClick={rollDice}>Roll</button>
    </main>
  );
}