import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';



const app = (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

ReactDOM.render(app, document.getElementById('root'));


// serviceWorker.register();

serviceWorker.register({
    onUpdate: registration => {
      alert('New version available!  Ready to update?');
      if (registration && registration.waiting) {
        registration.waiting.postMessage({ type: 'SKIP_WAITING' });
      }
      window.location.reload();
    }
  });
