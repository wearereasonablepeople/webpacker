import {createBrowserHistory, createMemoryHistory} from 'history';

const history = process.env.SERVER === 'true'
  ? createMemoryHistory()
  : createBrowserHistory();

// monkey patch history to avoid transitions to same route
const push = history.push;
history.push = (path, state) => String(path) === history.location.pathname ? null : push(path, state);

export default history;
