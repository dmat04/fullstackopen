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

export default Course