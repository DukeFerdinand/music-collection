import { Switch, Route } from 'react-router-dom';

import { Home } from './Home';

export const Layout: React.FC = () => {
  return (
    <main>
      <nav></nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route
          path="*"
          component={() => {
            return (
              <div className="p-5">
                <h1 className="text-2xl">404 - Page not found</h1>
              </div>
            );
          }}
        />
      </Switch>
    </main>
  );
};
