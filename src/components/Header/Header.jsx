import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Images and logos
import LogoImage from '../../assets/all-images/logo/logo.svg';
import mobtoggoleIcon from '../../assets/icons/mobtoggole.svg';
import { Link, useNavigate } from "react-router-dom";

const navLinks = [
  { path: "/", display: "Home" },
  { path: "/", display: "Car Buy" },
  { path: "/", display: "Reviews & History" },
  { path: "/contact", display: "Contact" },
];

const Header = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);
  const navigate = useNavigate()

  const toggleMobileNav = () => {
    setShowMobileNav(!showMobileNav);
  };

  return (
    <>
      <Headers>
        <Container>
          <Logo className="image">
            <img src={LogoImage} alt="Logo" />
          </Logo>
          <ItemsContainer>
            {navLinks.map((link) => (
              <Ul key={link.path}>
                <Li className="group">
                  <Link to={link.path}>{link.display}</Link>
                  <span></span>
                </Li>
              </Ul>
            ))}
          </ItemsContainer>
          <ContactBtnContainer>
            <Button onClick={()=>navigate('/contact')}>Request a call</Button>
            <MobileToggole onClick={toggleMobileNav}>
              <img src={mobtoggoleIcon} alt="Toggle Menu" />
            </MobileToggole>
          </ContactBtnContainer>
        </Container>
      </Headers>
      {showMobileNav && (
        <MobileNavContainer
          as={motion.div}
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
        >
          <CloseIcon onClick={toggleMobileNav}>
            <img src={mobtoggoleIcon} alt="Close Menu" />
          </CloseIcon>
          <MobileNavItems>
            {navLinks.map((link, index) => (
              <motion.p
                key={index}
                onClick={() => setShowMobileNav(false)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={link.path}>{link.display}</Link>
              </motion.p>
            ))}
          </MobileNavItems>
        </MobileNavContainer>
      )}
    </>
  );
};

export default Header;

const Headers = styled.header`
  width: 100%;
  height: 70px;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
`;

const Container = styled.div`
  height: 100%;
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1440px) {
    width: 90%;
  }
`;

const Logo = styled.div`
  img {
    width: 50px;
    height: 50px;
  }
`;

const ItemsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;

  @media (max-width: 1440px) {
    gap: 10px;
  }
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const Ul = styled.ul``;

const Li = styled.li`
  padding-top: 20px;
  font-size: 16px;
  cursor: pointer;
  font-family: 'general-sans-regular';
  padding-bottom: 6px;
  transition: all 0.3s ease-in-out;
  position: relative;

  span {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 2px;
    background-color: black;
    transition: all 0.3s ease-in-out;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  &:hover {
    font-family: 'general-sans-medium';
    span {
      width: 100%;
    }
  }
`;

const ContactBtnContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

const MobileToggole = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
  }

  img {
    width: 30px;
  }
`;

const Button = styled.button`
  background-color: #000d6b;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 14px;
  font-family: 'general-sans-medium';
  cursor: pointer;
  border: none;
  outline: none;
  color: white;
`;

// Mobile Navbar Styles
const MobileNavContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 50;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const MobileNavItems = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: center;
  font-family: 'general-sans-medium';
  color: #4c956c;

  p {
    font-size: 20px;
    cursor: pointer;
    color: #4c956c;
    margin-bottom: 0;
    transition: color 0.3s ease;

    a {
      text-decoration: none;
      color: inherit;
    }

    &:hover {
      color: #052d23;
    }
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 12px;
  right: 11px;
  cursor: pointer;

  img {
    width: 24px;
    height: 24px;
  }
`;
