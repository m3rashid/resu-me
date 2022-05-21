import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface IProps {}

const paths = [
  "template",
  "about",
  "education",
  "experience",
  "skills",
  "interests",
  "contact",
  "theme",
];

const findPathIndex = (path: string) => paths.indexOf(path);
const canGoNext = (i: number) => i < paths.length - 1;
const canGoBack = (i: number) => i > 0;

const NextPrevious: React.FC<IProps> = () => {
  const nextRef = React.useRef<any>(null);
  const prevRef = React.useRef<any>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pathIndex = findPathIndex(pathname.split("/").at(-1) as string);
  prevRef.current = canGoBack(pathIndex) ? paths[pathIndex - 1] : null;
  nextRef.current = canGoNext(pathIndex) ? paths[pathIndex + 1] : null;

  const goBack = () => {
    if (canGoBack(pathIndex)) {
      navigate(`/create/${paths[pathIndex - 1]}`);
    }
  };

  const goAhead = () => {
    if (canGoNext(pathIndex)) {
      navigate(`/create/${paths[pathIndex + 1]}`);
    }
  };

  const boxStyle = {
    paddingY: 3,
    paddingX: 2,
    rounded: "md",
    cursor: "pointer",
    _hover: {
      boxShadow: "lg",
      textShadow: "0.5px 0.5px #DD6B20",
    },
  };

  return (
    <Flex direction="row" alignItems="center" justifyContent="space-between">
      <Flex
        flexDirection="column"
        alignItems="flex-start"
        justifyContent="center"
        onClick={goBack}
        paddingRight={10}
        {...boxStyle}
      >
        <Heading as="h3" size="md">
          Previous
        </Heading>
        {prevRef.current && <Text>Choose {prevRef.current}</Text>}
      </Flex>
      <Flex
        flexDirection="column"
        alignItems="flex-end"
        justifyContent="center"
        onClick={goAhead}
        paddingLeft={10}
        {...boxStyle}
      >
        <Heading as="h3" size="md">
          Next
        </Heading>
        {nextRef.current && <Text>Choose {nextRef.current}</Text>}
      </Flex>
    </Flex>
  );
};

export default NextPrevious;
