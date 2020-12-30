import { gql, useQuery } from '@apollo/client';
import logo from '../logo.svg';
const TEST_QUERY = gql`
  query TestQuery {
    hello
    custom
  }
`;

export const Home: React.FC = () => {
  const { data, loading, error } = useQuery(TEST_QUERY);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is a CRA-based app with Google Cloud Functions handling data and
          serving GraphQL. See the example queries below:
        </p>
        <p>Hello Query: {data ? data.hello : 'Loading...'}</p>
        <p>Custom Query: {data ? data.custom : 'Loading...'}</p>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};
