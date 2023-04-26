import React, { useState } from "react";

const App = () => {
  const [numberFrom, setNumberFrom] = useState("");
  const [numberTo, setNumberTo] = useState("");

  const clickAddTask = (event) => {
    event.preventDefault();

    fetch("api/send", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ numberFrom, numberTo }),
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <h1>SMS APP</h1>
      <form onSubmit={clickAddTask}>
        <input
          type="text"
          size="30"
          placeholder="From"
          value={numberFrom}
          onChange={(event) => setNumberFrom(event.target.value)}
        />
        <input
          type="text"
          size="30"
          placeholder="To"
          value={numberTo}
          onChange={(event) => setNumberTo(event.target.value)}
        />
        <input className="btn-primary" type="submit" value="Add" />
      </form>
    </div>
  );
};

export default App;
