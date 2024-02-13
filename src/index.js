import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store, { persistor } from './store';
import App from './App';
import "material-react-toastify/dist/ReactToastify.css";
import { ToastContainer } from 'material-react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router basename={process.env.PUBLIC_URL}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
      <ToastContainer autoClose={2000} hideProgressBar closeOnClick rtl={false} />
    </Provider>
  </Router>
);
