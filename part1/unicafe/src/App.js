import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticLine = ({ stat, value }) => (
  <div>{stat} {value}</div>
)

const CalculateStats = (good, neutral, bad) => {
  const total = good + neutral + bad
  const average = (good - bad) / total 
  const positive = (good / total) * 100

  return {
    total: total,
    average: average ? average : 0,
    positive: positive ? positive : 0
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const stats = CalculateStats(good, neutral, bad)

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <h1>Statistics</h1>
      <StatisticLine stat='Good' value={good} />
      <StatisticLine stat='Neutral' value={neutral} />
      <StatisticLine stat='Bad' value={bad} />
      <br />
      <StatisticLine stat='All' value={stats.total} />
      <StatisticLine stat='Average' value={stats.average} />
      <StatisticLine stat='Positive' value={stats.positive + '%'} />
    </div>
  )
}

export default App