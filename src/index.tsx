import React from "react";
import ReactDOM from "react-dom";
import { ChakraProvider, Container } from "@chakra-ui/react";
import theme from "./utils/theme";
import Layout from "./components/Layout";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
//@ts-ignore
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <Layout title="Moviebase">
        <Container>
          <App />
        </Container>
      </Layout>
    </ChakraProvider>
  </BrowserRouter>
);
