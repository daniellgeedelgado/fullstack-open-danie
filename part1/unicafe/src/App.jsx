import { useState } from "react";

const Button = ({ handleClick, feedback }) => (
  <button onClick={handleClick}>{feedback}</button>
);

const Content = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Feedback = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = ((good - bad) / all).toFixed(1);
  const positive = ((good / all) * 100).toFixed(1);

  if (all == 0) {
    return <p>No feedback given</p>;
  }

  return (
    <table>
      <tbody>
        <Content text="good" value={good} />
        <Content text="neutral" value={neutral} />
        <Content text="bad" value={bad} />
        <Content text="all" value={all} />
        <Content text="average" value={average} />
        <Content text="positive" value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodFeedback = () => {
    setGood(good + 1);
  };

  const nuetralFeedback = () => {
    setNeutral(neutral + 1);
  };

  const badFeedback = () => {
    setBad(bad + 1);
  };

  return (
    <>
      <h1>give feedback</h1>
      <Button handleClick={goodFeedback} feedback="good" />
      <Button handleClick={nuetralFeedback} feedback="neutral" />
      <Button handleClick={badFeedback} feedback="bad" />
      <h1>statistics</h1>
      <Feedback good={good} neutral={neutral} bad={bad} />
    </>
  );
};

export default App;