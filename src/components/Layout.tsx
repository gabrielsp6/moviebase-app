import { Box, VStack, Grid } from "@chakra-ui/react";
import Header from "./Header";

export default function Layout({ children, title } : {children : any, title: string}) {
  return (
    <>
      <Grid minH="100vh">
        <VStack w="full" align="stretch" spacing={8}>
          <Header />
          <Box as="main" h="full">
            {children}
          </Box>
        </VStack>
      </Grid>
    </>
  );
}
