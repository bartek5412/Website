import { useReducer } from 'react';
export interface State {

    counter: number
  }
 export type Action = 
    | { type: 'increment' }
    | { type: 'decrement' }
    | { type: 'reset' };
  
export  const reducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'decrement': return {counter: state.counter > 0 ?state.counter - 1 : 0};
      case 'increment': return {counter: state.counter + 1};
      case 'reset': return {counter: 0};
      default: return state;
    }
  }
 export  const CouterWithReducer: React.FC = () => {
    const [state, dispatch] = useReducer(reducer, {counter: 0 });
  
    return (
      <div>
        <p> Count with reducer: {state.counter}</p>
        <button onClick={() => dispatch({ type: 'increment' })}>+</button>
        <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
        <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
      </div>
    )
  }