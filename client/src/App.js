import "./App.css";
import { ApolloClient, InMemoryCache, HttpLink, } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import DisplayData from "./DisplayData";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: "http://localhost:4000/graphql" }),
  });

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>Fetching data</h1>
        <DisplayData />
      </div>
    </ApolloProvider>
  );
}

export default App;
