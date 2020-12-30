import { ApolloProvider } from '@apollo/client';
import { client } from '../lib/apollo';

export const Providers: React.FC = ({ children }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
