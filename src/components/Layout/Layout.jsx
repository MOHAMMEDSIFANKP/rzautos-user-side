import React, { Fragment } from "react";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Routers from "../../routers/Routers";
import styled from "styled-components";

const Layout = () => {
  return (
    <Section>
      <Header />
      <div>
        <Routers />
      </div>
      <Footer />
    </Section>
  );
};

export default Layout;

const Section = styled.div`
  width: 100%;
  overflow-x: hidden;
`