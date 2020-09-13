import React from 'react';
import Home from './Home';

import { Provider } from "react-redux";
import {store} from '../store';
import Header from './Header';
import 'bootstrap/dist/css/bootstrap.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

function App() {
  return (
    <Provider store={store}>
      <div className="container">
        <Header/>
        <Home />
      </div>
    </Provider>
  );
}

export default App;