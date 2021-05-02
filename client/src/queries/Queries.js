import { gql } from "@apollo/client";

const GET_AUTHORS = gql`
  query Authors {
    authors {
      id
      name
    }
  }
`;

const GET_BOOKS = gql`
  query Books {
    books {
      id
      name
      genre
    }
  }
`;

const ADD_BOOK = gql`
  mutation AddBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
    }
  }
`;

const GET_BOOK_BY_ID = gql`
  query AddBook($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          id
          name
        }
      }
    }
  }
`;

export { GET_BOOKS, GET_AUTHORS, ADD_BOOK, GET_BOOK_BY_ID };
