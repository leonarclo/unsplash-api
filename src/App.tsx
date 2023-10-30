import { Box, Button, FormControl, Input, SimpleGrid } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

interface IPhotoCollection {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  user: {
    username: string;
  };
}

function App() {
  const [photos, setPhotos] = useState<IPhotoCollection | null>(null);
  const [query, setQuery] = useState<string>("");

  const searchPhotoCollections = async () => {
    try {
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=pCGFLx6vvuhHlkpEKNukubGXoSsvvX9VD8mrwzphIBU`
      );
      setPhotos(response.data.results);
      console.log(photos);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box display="flex" flexDirection={"column"} h="100vh" w="100vw">
      <Box
        w="100%"
        backgroundColor={"blackAlpha.900"}
        p={8}
        borderBottom={"4px"}
        borderColor={"white"}
      >
        <Box w={"container.xl"} m={"auto"}>
          <Text
            fontSize={32}
            color={"white"}
            fontWeight={"bold"}
            textAlign={"center"}
            mb={8}
          >
            Olá, precisa de inspiração hoje?
          </Text>
          <FormControl display={"flex"} gap={10}>
            <Input
              placeholder="O que você está procurando?"
              color={"white"}
              isRequired={true}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            ></Input>
            <Button w={200} type="submit" onClick={searchPhotoCollections}>
              Procurar
            </Button>
          </FormControl>
        </Box>
      </Box>
      <Box width="100%" flex="1" backgroundColor={"blackAlpha.800"}>
        <SimpleGrid border={"white"}></SimpleGrid>
      </Box>
    </Box>
  );
}

export default App;
