const Header = ({ name }) => <h2>{name}</h2>

const Content = ({ parts }) => parts.map(part => <Part part={part} key={part.id} />)

const Part = ({ part }) => <p>{part.name} {part.exercises}</p>

const Sum = ({ parts }) => {
  const sum = parts.reduce(
    (acc, it) => acc + it.exercises,
    0
  )

  return <strong>Total of {sum} exercises</strong>
}

const Course = ({ course }) => (
  <>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Sum parts={course.parts} />
  </>
)

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      { courses.map(it => <Course course={it} key={it.id} />) }
    </div>
  )
}

export default App;