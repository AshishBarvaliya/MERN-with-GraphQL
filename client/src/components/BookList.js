import React, { useEffect, useState } from "react";
import { Flex, Text, Box } from "rebass";
import { useQuery, useLazyQuery } from "@apollo/client";
import { GET_BOOKS, GET_BOOK_BY_ID } from "../queries/Queries";

const BookList = () => {
  const { data, loading } = useQuery(GET_BOOKS);
  const [getBook, { data: bookData, loading: bookloading }] = useLazyQuery(
    GET_BOOK_BY_ID
  );
  const [selected, setSelected] = useState(undefined);

  useEffect(() => {
    if (selected) getBook({ variables: { id: selected } });
  }, [selected]);

  useEffect(() => {
    if (!bookloading && bookData) console.log("bookData", bookData);
  }, [bookData, bookloading]);

  return (
    <Flex flex={1} justifyContent="center">
      <Flex flexDirection="column">
        <Text fontSize="25px"> My Book List</Text>
        <Flex mt={23}>
          <Flex flexDirection="column">
            {loading ? (
              <Text>Loading...</Text>
            ) : (
              data.books.map((e) => (
                <Text
                  key={e.id}
                  color={selected === e.id ? "#EBAB92" : "black"}
                  onClick={() => setSelected(e.id)}
                  sx={{ ":hover": { cursor: "pointer" } }}
                >
                  {e.name}
                </Text>
              ))
            )}
          </Flex>
          <Flex flexDirection="column" ml={30}>
            {selected ? (
              bookloading ? (
                <Text fontWeight={600}>Loading....</Text>
              ) : (
                bookData && (
                  <>
                    <Text fontWeight={600}>
                      {"Book Name: " + bookData.book.name}
                    </Text>
                    <Text>{"Genre: " + bookData.book.genre}</Text>
                    <Text>{"Author: " + bookData.book.author.name}</Text>
                    <Text>{"All books of " + bookData.book.author.name}</Text>
                    {bookData.book.author.books.map((e) => (
                      <Box as="li" key={e.id}>
                        {e.name}
                      </Box>
                    ))}
                  </>
                )
              )
            ) : (
              <Text fontWeight={600}> No book selected</Text>
            )}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default BookList;
