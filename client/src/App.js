import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import "./App.css";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";



const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BookList />
      <AddBook />
    </ApolloProvider>
  );
}

export default App;
