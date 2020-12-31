import { Switch, Route } from 'react-router-dom';

import { Home } from './Home';

export const Layout: React.FC = () => {
  return (
    <main>
      <nav></nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="*" component={() => <h1>404 - Page not found</h1>} />
      </Switch>
    </main>
  );
};
