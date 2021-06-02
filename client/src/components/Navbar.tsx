import React from "react";
import { Box, Flex, GridItem, Link } from "@chakra-ui/layout";
import NextLink from "next/link";
import { useMeQuery, useLogoutMutation } from "../generated/graphql";
import { Button } from "@chakra-ui/button";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  if (fetching || !data) {
    return <div></div>;
  }

  return (
    <Box bg="teal" p={4} mx="auto" color="white">
      <Flex
        justifyContent="flex-end"
        alignItems="center"
        gridGap={3}
        minH="2rem"
      >
        {data.me ? (
          <>
            <GridItem>{data.me.username}</GridItem>
            <GridItem>
              <Button
                variant="ghost"
                onClick={() => logout()}
                maxH="2rem"
                isLoading={logoutFetching}
              >
                Logout
              </Button>
            </GridItem>
          </>
        ) : (
          <>
            <GridItem>
              <NextLink href="/login">
                <Link color="white">Login</Link>
              </NextLink>
            </GridItem>
            <GridItem>
              <NextLink href="/register">
                <Link color="white">Register</Link>
              </NextLink>
            </GridItem>
          </>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
