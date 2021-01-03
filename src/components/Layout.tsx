import { Switch, Route } from 'react-router-dom';
import { BandcampUtils } from './BandcampUtils';

import { Home } from './Home';

export const Layout: React.FC = () => {
  return (
    <main className="p-5 h-screen w-screen dark:bg-gray-800">
      <nav></nav>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/bandcamp" component={BandcampUtils} />
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
