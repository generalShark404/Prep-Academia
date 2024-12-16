// import logo from './logo.svg';
import * as React from 'react'
import Main from './components/Main';
import { AuthProvider } from './components/auth-context';

function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default App;
