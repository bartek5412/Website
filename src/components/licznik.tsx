import { useState } from "react";

const Licznik: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const removeCount = () => {
      if (count > 0) {
        setCount(count - 1);
      } else {
        alert("Wartość jest mniejsza od zera")
      }
    }
    return (
      <div>
      <p>Current counter: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add
      </button>
      <button onClick={removeCount}>Delete</button>
      </div>
    )
  }
  export default Licznik;