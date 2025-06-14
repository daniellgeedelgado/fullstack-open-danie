const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ part1, exercises1, part2, exercises2, part3, exercises3 }) => {
  return (
    <div>
      <Part part={{ name: part1, exercises: exercises1 }} />
      <Part part={{ name: part2, exercises: exercises2 }} />
      <Part part={{ name: part3, exercises: exercises3 }} />
    </div>
  );
};

const Total = ({ exercises1, exercises2, exercises3 }) => {
  const total = exercises1 + exercises2 + exercises3;
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = 'Half Stack application development';
  const part1 = 'Fundamentals of React';
  const exercises1 = 10;
  const part2 = 'Using props to pass data';
  const exercises2 = 7;
  const part3 = 'State of a component';
  const exercises3 = 14;

  return (
    <div>
      <Header name={course} />
      <Content
        part1={part1}
        exercises1={exercises1}
        part2={part2}
        exercises2={exercises2}
        part3={part3}
        exercises3={exercises3}
      />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  );
};

export default App;
