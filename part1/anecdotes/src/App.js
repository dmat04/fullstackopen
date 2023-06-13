import { useState } from 'react'

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min)
}

const Anecdote = ({ anecdote, votes }) => (
  <div>
    <p><em>{anecdote}</em></p>
    <p>Has {votes} votes</p>
  </div>
)

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [scores, setScores] = useState(Array(anecdotes.length).fill(0))

  const handleNextAnecdoteClick = () => {
    const i = getRandomInt(0, anecdotes.length)
    console.log('Generated random index: ', i)
    setSelected(i)
  }

  const handleVoteClick = () => {
    const newScores = [...scores]
    newScores[selected] += 1
    setScores(newScores)
  }

  // Using Array.reduce() to find the index of the biggest score
  // The accumulator (maxIdx) of the callback function is the index
  // of the biggest score element (intially set to 0). On each call, 
  // the callback function checks whether the current element value 
  // is bigger than the value at 'array[maxIdx]', and if it is,
  // returns the current index, otherwise returns the old accumulator
  // value (maxIdx).
  const maxScoreIndex = scores.reduce(
    (maxIdx, val, i, array) => val >= array[maxIdx] ? i : maxIdx,
    0
  )

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={scores[selected]} />
      <Button handleClick={handleVoteClick} text='Vote' />
      <Button handleClick={handleNextAnecdoteClick} text='Next anecdote' />
      <br />
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[maxScoreIndex]} votes={scores[maxScoreIndex]} />
    </div>
  )
}

export default App