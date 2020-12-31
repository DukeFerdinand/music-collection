import React from 'react';
import './App.css';
import { Providers } from './components/Providers';
import { Layout } from './components/Layout';
import { Router } from './lib/Router';

function App(): JSX.Element {
  return (
    <Providers>
      <Router>
        {/* Layout provides top level styles + components */}
        <Layout />
      </Router>
    </Providers>
  );
}

export default App;
