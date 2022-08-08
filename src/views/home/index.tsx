import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  VStack,
  Text,
  HStack,
  Image,
  ButtonGroup,
  Flex,
  SimpleGrid,
} from "@chakra-ui/react";
import { FC, useState } from "react";
import { useRouter } from "next/router";
import katradeBg from "../../../public/katrade-bg-1-darken.png";
import dataProtection from "../../../public/data-protection.png";

const HomePage: FC = () => {
  const headerBaseStyles = {
    fontWeight: 600,
    letterSpacing: "-1px",
  };

  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const handleToSigninPage = () => {
    setLoading(true);
    return router.push("/projects/manager");
  };
  return (
    <Box pb="100px">
      <Box
        h="100vh"
        bgImage={katradeBg.src}
        bgPosition="center"
        bgSize="cover"
        borderRadius="0 0 28px 28px"
      >
        <Container maxW="container.xl" py="24vh" position="relative" h="full">
          <Box maxW="700px">
            <Heading color="white" fontSize="2.6rem">
              Create awesome apps for Kasetsart University
            </Heading>
            <Text fontWeight={600} fontSize={18} color="#ffffff80" my={6}>
              with Katrade Accounts, Developer Platform for KU Developers
            </Text>
            <Flex my={8} flexWrap="wrap" gap={4}>
              <Button
                size="md"
                bg="white"
                color="katrade.main"
                onClick={() => router.push("/projects/manager")}
              >
                Create your app now
              </Button>
              <Button
                size="md"
                bg="#ffffff50"
                color="white"
                _hover={{ bg: "#ffffff80" }}
              >
                How it works ?
              </Button>
            </Flex>
          </Box>
        </Container>
      </Box>
      <Box>
        <Container maxW="container.lg" py="100px">
          <Heading
            {...headerBaseStyles}
            size="lg"
            textAlign="center"
            fontWeight={600}
          >
            Key Features
          </Heading>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} my={16} gap={20}>
            <VStack spacing={16}>
              <Heading {...headerBaseStyles} size="md">
                Users Authentication
              </Heading>
              <Box h="80px">
                <Center
                  bg="katrade.main"
                  h="50px"
                  px={20}
                  rounded={6}
                  color="white"
                  fontWeight={500}
                >
                  Sign in with KU
                </Center>
              </Box>
              <Box color="#00000090" maxW={300} fontWeight={500}>
                We provide authentication service that help developers to
                identify their users identity with Kasetsart University.
              </Box>
            </VStack>
            <VStack spacing={16}>
              <Heading {...headerBaseStyles} size="md">
                Students API
              </Heading>
              <Box h="80px">
                <Image
                  src={dataProtection.src}
                  alt="data-icon"
                  h="60px"
                />
              </Box>
              <Box color="#00000090" maxW={300} fontWeight={500}>
                Students API is an interface which help developers to request
                student’s data from Kasetsart API easily. Students API{" "}
                <Box as="span" color="katrade.main" fontWeight={700}>
                  protect your sensitive data, personal data
                </Box>{" "}
                and let you customize how apps can access your personal data.
              </Box>
            </VStack>
          </SimpleGrid>

          <VStack my="200px" gap={6}>
            <Heading {...headerBaseStyles} textAlign="center">
              Unlock your{" "}
              <Box as="span" color="katrade.main" fontWeight={700}>
                ideas
              </Box>
            </Heading>
            <Text fontSize={20} fontWeight={500} maxW={560} textAlign="center">
              Katrade Accounts let you create applications a lot easier. Sign up
              now, and make KU better with your hands.
            </Text>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};
export default HomePage;
