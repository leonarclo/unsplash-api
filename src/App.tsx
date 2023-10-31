import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  SimpleGrid,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import CardPhoto from "./components/CardPhoto";

interface IPhotoCollection {
  id: string;
  alt_description: string;
  description: string;
  urls: {
    full: string;
    regular: string;
    small: string;
  };
  tags: string[];
  user: {
    username: string;
  };
}

function App() {
  const [photos, setPhotos] = useState<IPhotoCollection[] | null>(null);
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
    <Box
      display="flex"
      flexDirection={"column"}
      h="100vh"
      w="100vw"
      overflowX={"hidden"}
    >
      <Box
        w="100%"
        backgroundColor={"blackAlpha.900"}
        p={8}
        borderBottom={"4px"}
        borderColor={"white"}
      >
        <Box maxWidth={"container.xl"} m={"auto"}>
          <Text
            fontSize={32}
            color={"white"}
            fontWeight={"bold"}
            textAlign={"center"}
            mb={8}
          >
            Olá, precisa de inspiração hoje?
          </Text>
          <FormControl display={"flex"} gap={10} p={8}>
            <Input
              flex={1}
              placeholder="O que você está procurando?"
              color={"white"}
              isRequired={true}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            ></Input>
            <Button onClick={searchPhotoCollections}>Procurar</Button>
          </FormControl>
        </Box>
      </Box>
      <Box backgroundColor={"blackAlpha.800"}>
        <Box
          maxWidth={"container.xl"}
          border={"white"}
          mx={"auto"}
          p={8}
          sx={{
            columnCount: [1, 2, 3],
            columnGap: "12px",
          }}
        >
          {photos?.map((photo) => (
            <Box key={photo.id} rounded={"sm"}>
              <Box mb={4} overflow={"hidden"}>
                <Text
                  textAlign={"center"}
                  color={"black"}
                  fontWeight={"bold"}
                  textTransform={"capitalize"}
                  backgroundColor={"white"}
                  borderTopRadius={10}
                >
                  {photo.alt_description}
                </Text>
                <Image
                  src={photo.urls.small}
                  borderBottomRadius={10}
                  w={"100%"}
                />
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

export default App;
