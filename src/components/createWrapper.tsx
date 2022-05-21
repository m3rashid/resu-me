import { Container, Flex } from "@chakra-ui/react";
import React from "react";
import NextPrevious from "./main/nextPrevious";

interface IProps {
  children: React.ReactNode;
}

const CreateWrapper: React.FC<IProps> = ({ children }) => {
  return (
    <Container padding="30px 0" height="100%">
      <Flex direction="column" gap="25px" justifyContent="space-between">
        {children}
        <NextPrevious />
      </Flex>
    </Container>
  );
};

export default CreateWrapper;
