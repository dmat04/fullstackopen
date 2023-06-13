import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticTableLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const CalculatedAverages = ({ statistics }) => {
  if (statistics.total > 0) {
    return (
      <>
        <StatisticTableLine text='All' value={statistics.total} />
        <StatisticTableLine text='Average' value={statistics.average} />
        <StatisticTableLine text='Positive' value={statistics.positive + '%'} />
      </>
    )
  } else {
    return (
      <tr>
        <td colSpan={2}>No feedback given</td>
      </tr>
    )
  }
}

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
      <table>
        <tbody>
          <StatisticTableLine text='Good' value={good} />
          <StatisticTableLine text='Neutral' value={neutral} />
          <StatisticTableLine text='Bad' value={bad} />
          <CalculatedAverages statistics={stats} />
        </tbody>
      </table>
    </div>
  )
}

export default App