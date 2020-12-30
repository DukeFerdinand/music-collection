import React from 'react';
import './App.css';
import { Providers } from './components/Providers';
import { Layout } from './components/Layout';
import { Home } from './components/Home';

function App(): JSX.Element {
  return (
    <Providers>
      {/* Layout provides top level styles + components */}
      <Layout>
        <Home />
      </Layout>
    </Providers>
  );
}

export default App;
