import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from './counterSlice';
import { getLinks } from '../Booru/BooruSlice';
import styles from './Counter.module.css';
import { selectBooruLinks } from '../Booru/BooruSlice';


export function Counter() {
  //selector accesses redux store
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  //use stae is this components state
  const [incrementAmount, setIncrementAmount] = useState('2');

  const links = useSelector(selectBooruLinks);
  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>

      <button onClick={() => dispatch(getLinks())}> </button>
      {
        links.map((link: String) => {
          return <p>{link}</p>
        })
      }

    </div>
  );
}
