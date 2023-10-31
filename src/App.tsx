/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  FormControl,
  Image,
  Input,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";

interface IPhotoCollection {
  id: string;
  alt_description: string;
  description: string;
  urls: {
    full: string;
    regular: string;
    small: string;
  };
  links: {
    download: string;
  };
  tags: string[];
  user: {
    username: string;
  };
}

function App() {
  const [photos, setPhotos] = useState<IPhotoCollection[] | null>(null);
  const [query, setQuery] = useState<string>("");
  const [queryName, setQueryName] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const searchPhotoCollections = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.unsplash.com/search/photos?page=${currentPage}&query=${query}&client_id=pCGFLx6vvuhHlkpEKNukubGXoSsvvX9VD8mrwzphIBU`
      );
      setPhotos(response.data.results);
      setQueryName(query);
      setTotalPages(response.data.total_pages);
      console.log(response.data.results);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      searchPhotoCollections();
      console.log(currentPage);
    }
  };

  const handleNextPage = (lastPage: number) => {
    if (currentPage < lastPage) {
      setCurrentPage(currentPage + 1);
      searchPhotoCollections();
      console.log(currentPage);
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
          <Text fontSize={32} color={"white"} fontWeight={"bold"} px={8} mb={8}>
            Olá, precisa de inspiração hoje?
          </Text>
          <FormControl
            display={"flex"}
            flexDirection={["column", "column", "row"]}
            gap={10}
            p={8}
          >
            <Input
              flex={3}
              p={4}
              placeholder="O que você está procurando?"
              color={"white"}
              isRequired={true}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              autoFocus
            ></Input>
            <Button onClick={searchPhotoCollections} flex={1} p={4}>
              Procurar
            </Button>
          </FormControl>
        </Box>
      </Box>
      {!loading ? (
        <Box backgroundColor={"blackAlpha.800"} flex={1}>
          {photos &&
            (photos?.length >= 1 ? (
              <Box>
                <Text textAlign={"center"} fontSize={24} color={"white"} p={4}>
                  Resultados para: <strong>{queryName}</strong>
                </Text>
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
                  {photos.map((photo) => (
                    <Box key={photo.id} rounded={"sm"}>
                      <Box mb={8} overflow={"hidden"}>
                        <Text
                          px={4}
                          textAlign={"center"}
                          color={"black"}
                          fontWeight={"bold"}
                          textTransform={"capitalize"}
                          backgroundColor={"white"}
                          borderTopRadius={10}
                        >
                          {photo.alt_description}
                        </Text>
                        <Image src={photo.urls.small} w={"100%"} />
                        <Box>
                          <Link
                            href={`${photo.links.download}&force=true`}
                            download={true}
                          >
                            <Button w={"100%"} borderTopRadius={0}>
                              Download
                            </Button>
                          </Link>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  color={"white"}
                  gap={8}
                  pb={10}
                >
                  <Button onClick={handlePrevPage}>Prev</Button>
                  <Text fontSize={24}>{currentPage}</Text>
                  <Button onClick={() => handleNextPage(totalPages)}>
                    Next
                  </Button>
                </Box>
              </Box>
            ) : (
              <Text textAlign={"center"} mt={10} fontSize={24} color={"white"}>
                Sem resultados :c
              </Text>
            ))}
        </Box>
      ) : (
        <Box textAlign="center" py={4}>
          <Spinner size="xl" color="teal.500" />
        </Box>
      )}
    </Box>
  );
}

export default App;
