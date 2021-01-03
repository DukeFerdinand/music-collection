import { gql, useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
// import logo from '../logo.svg';
const TEST_QUERY = gql`
  query TestQuery {
    hello
    custom
  }
`;

export const Home: React.FC = () => {
  const { data, loading, error } = useQuery(TEST_QUERY);
  return (
    <div className="dark:text-white">
      <header>
        <h1 className="text-3xl">Music Collection Manager</h1>
      </header>
      <p>
        This is my personal collection of music collection utilities to help
        search, track, and automatically remind me of anything involving my
        music collection
      </p>
      <nav>
        <Link className="text-blue-400 hover:text-blue-500" to="/bandcamp">
          Bandcamp Utilities
        </Link>
      </nav>
      <div className="mt-5">
        <h2 className="text-2xl">Example Queries</h2>
        {loading && <div>Loading...</div>}
        {data && (
          <>
            <p>Hello Query: {data ? data.hello : 'Loading...'}</p>
            <p>Custom Query: {data ? data.custom : 'Loading...'}</p>
          </>
        )}
        {error && <p>Got an error: {JSON.stringify(error)}</p>}
      </div>
    </div>
  );
};
