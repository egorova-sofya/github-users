import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Test = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/todos/1`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
      })
      .catch((e) => console.log('error', e));
  }, []);

  if (!data) {
    return <>Loading...</>;
  }

  return (
    <>
      <h1>Test</h1>
      <h3>{data.title}</h3>
      <button>click</button>
      <Link to="/">HOME</Link>
    </>
  );
};

export default Test;
