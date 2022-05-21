import React from "react";
import { SimpleGrid, Icon, Text, Flex, Container } from "@chakra-ui/react";
import { FcDownload, FcTemplate, FcViewDetails } from "react-icons/fc";

interface IProps {
  title: string;
  text: string;
  icon: React.ReactElement;
}

const Feature: React.FC<IProps> = ({ title, text, icon }) => {
  return (
    <Flex align={"center"} justify={"center"} direction={"column"} gap={2}>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={"gray.600"} align="center">
        {text}
      </Text>
    </Flex>
  );
};

const HomeDetails = () => {
  return (
    <Container maxW={"5xl"} py={{ base: 20, md: 28 }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} padding="10px">
        <Feature
          icon={<Icon as={FcTemplate} w={10} h={10} />}
          title="Choose your Template"
          text="Choose from our beautiful templates. Customize for your unique touch."
        />
        <Feature
          icon={<Icon as={FcViewDetails} w={10} h={10} />}
          title="Fill in your details"
          text="Fill in your skills, education, interests and other details"
        />
        <Feature
          icon={<Icon as={FcDownload} w={10} h={10} />}
          title="Download Pdf"
          text="Download the resume and send it to your potential employers with confidence"
        />
      </SimpleGrid>
    </Container>
  );
};

export default HomeDetails;
