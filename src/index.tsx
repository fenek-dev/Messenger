import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import './normilize.css';
import { Provider } from 'react-redux';
import store from './Redux/Reducers/rootReducer';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router>
        <Switch>
          <App />
        </Switch>
      </Router>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);
