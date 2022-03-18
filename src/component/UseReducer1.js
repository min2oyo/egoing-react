import { useReducer } from "react";

function UseReducer1() {

  function countReducer(oldCount, action) {
    if (action === "UP") {
      return oldCount + 1;
    } else if (action === "DOWN") {
      return oldCount - 1;
    } else if (action === "RESET") {
      return 0;
    }
  }

  const [count, countDispatch] = useReducer(countReducer, 0);

  function down() {
    countDispatch("DOWN");
  }
  function reset() {
    countDispatch("RESET");
  }
  function up() {
    countDispatch("UP");
  }

  return (
    <div>
      <input type='button' value='-' onClick={down} />
      <input type='button' value='0' onClick={reset} />
      <input type='button' value='+' onClick={up} />
      <span>{count}</span>
    </div>
  )
}

export default UseReducer1;