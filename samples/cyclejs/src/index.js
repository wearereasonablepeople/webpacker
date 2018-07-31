import xs from 'xstream';
import {run} from '@cycle/run';
import {makeDOMDriver, h1} from '@cycle/dom';

const main = () => {
  const sinks = {
    DOM: xs.periodic(1000).map(i =>
      h1(`Hello world! Counting ${i}...`)
    )
  };
  return sinks;
};

const drivers = {
  DOM: makeDOMDriver('#root')
};

run(main, drivers);
