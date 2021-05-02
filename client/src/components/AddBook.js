import React from "react";
import { Flex, Box, Button } from "rebass";
import { useQuery, useMutation } from "@apollo/client";
import { Input, Select, Label } from "@rebass/forms";
import { GET_AUTHORS, ADD_BOOK, GET_BOOKS } from "../queries/Queries";

const AddBook = () => {
  const { data, loading } = useQuery(GET_AUTHORS);
  const [addBook, { }] = useMutation(ADD_BOOK);

  return (
    <Box
      method="post"
      as="form"
      onSubmit={(e) => {
        const book = {
          name: e.target[0].value,
          genre: e.target[1].value,
          authorId: e.target[2].value,
        };
        console.log("form book", book);
        addBook({
          variables: { ...book },
          refetchQueries: [{ query: GET_BOOKS }],
        });
        e.preventDefault();
      }}
      py={3}
    >
      <Flex mx={-2} mb={3} flexDirection="column" alignItems="center">
        <Box width={1 / 2} px={2}>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" />
        </Box>
        <Box width={1 / 2} px={2}>
          <Label htmlFor="genre">Genre</Label>
          <Input id="genre" name="genre" />
        </Box>
        <Box width={1 / 2} px={2}>
          <Label htmlFor="author">Author</Label>
          <Select id="author" name="author" defaultValue="NYC">
            {loading ? (
              <option disabled>Loading...</option>
            ) : (
              data.authors.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.name}
                </option>
              ))
            )}
          </Select>
        </Box>
        <Button
          type="submit"
          sx={{
            mt: 2,
            width: 150,
            bg: "#EBAB92",
            color: "black",
            ":hover": { cursor: "pointer", opacity: 0.8 },
          }}
        >
          +
        </Button>
      </Flex>
    </Box>
  );
};

export default AddBook;
