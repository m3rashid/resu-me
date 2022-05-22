import React from "react";
import {
  Box,
  Flex,
  HStack,
  Link,
  IconButton,
  Button,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";

import { GiHamburgerMenu } from "react-icons/gi";
import { VscChromeClose } from "react-icons/vsc";
import { BsFillMoonFill, BsSun } from "react-icons/bs";
import { HiChevronDown } from "react-icons/hi";
import { Link as RouterLink } from "react-router-dom";

import Logo from "./logo";

const createInner = [
  { label: "Template", to: "/create/template" },
  { label: "About", to: "/create/about" },
  { label: "Education", to: "/create/education" },
  { label: "Experience", to: "/create/experience" },
  { label: "Skills", to: "/create/skills" },
  { label: "Interests", to: "/create/interests" },
  { label: "Contact", to: "/create/contact" },
  { label: "Theme", to: "/create/theme" },
];

interface ICustomLinkProps {
  to: string;
  children: React.ReactNode;
  noDrop?: boolean;
}

const CustomLink: React.FC<ICustomLinkProps> = ({ to, children, noDrop }) => {
  return (
    <Link
      as={RouterLink}
      to={to}
      _focus={{ border: "none" }}
      fontWeight="bold"
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      style={noDrop ? { padding: "8px 16px", borderRadius: "5px" } : {}}
    >
      {children}
    </Link>
  );
};

const DropDown = () => {
  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<HiChevronDown />}
        _focus={{ border: "none" }}
      >
        Create
      </MenuButton>
      <MenuList>
        {createInner.map((link) => (
          <CustomLink key={link.to} to={link.to}>
            <MenuItem>{link.label}</MenuItem>
          </CustomLink>
        ))}
      </MenuList>
    </Menu>
  );
};

const Header = ({ isHome = false }: { isHome?: boolean }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box
        className="header"
        bg={useColorModeValue("gray.100", "gray.900")}
        px={4}
        position="fixed"
        width="100%"
        top={0}
        zIndex={10}
        opacity={0.9}
        shadow="sm"
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            _focus={{ border: "none" }}
            size={"md"}
            icon={isOpen ? <VscChromeClose /> : <GiHamburgerMenu />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"}>
            <Flex alignItems={"center"} gap={"15px"}>
              <Logo />
              <span style={{ fontSize: "1.2rem", fontWeight: 700 }}>
                Resu Me
              </span>
            </Flex>
            <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
              <CustomLink to="/" noDrop>
                Home
              </CustomLink>
              {isHome ? (
                <CustomLink to="/create" noDrop>
                  Create
                </CustomLink>
              ) : (
                <DropDown />
              )}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode} _focus={{ border: "none" }}>
                {colorMode === "light" ? <BsFillMoonFill /> : <BsSun />}
              </Button>
            </Stack>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              <CustomLink to="/" noDrop>
                Home
              </CustomLink>
              <DropDown />
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Header;
