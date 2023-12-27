import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './Component/Website/AuthContext';
import { GoogleOAuthProvider } from "@react-oauth/google";

import './i18n';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<React.StrictMode>
<GoogleOAuthProvider clientId="765566652682-u39dba02df4ok6c6n5fqvlnc8l9efbpf.apps.googleusercontent.com">

<AuthProvider>

    <App />

    </AuthProvider>
    </GoogleOAuthProvider>

  </React.StrictMode>
 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
