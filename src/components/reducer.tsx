import { useReducer } from "react";

export interface State {
  counter: number;
}

export type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "reset" };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "decrement":
      return { counter: state.counter > 0 ? state.counter - 1 : 0 };
    case "increment":
      return { counter: state.counter + 1 };
    case "reset":
      return { counter: 0 };
    default:
      return state;
  }
};

export const CounterWithReducer: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, { counter: 0 });

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="p-6 border border-gray-300 rounded-lg shadow-md bg-white">
        <p className="text-2xl font-semibold mb-4">Licznik: {state.counter}</p>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => dispatch({ type: "increment" })}
          >
            +
          </button>
          <button
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
            onClick={() => dispatch({ type: "decrement" })}
          >
            -
          </button>
          <button
            className="px-4 py-2 text-white bg-gray-500 rounded hover:bg-gray-600"
            onClick={() => dispatch({ type: "reset" })}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};
export default CounterWithReducer;
