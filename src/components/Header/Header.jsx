import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import LogoImage from '../../assets/all-images/logo/logo.png';
import mobtoggoleIcon from '../../assets/icons/mobtoggole.svg';
import { Link, useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { path: "/", display: "Home" },
  { path: "/cars", display: "Car Buy" },
  { path: "/part-of-exchange", display: "Part of Exchange" },
  { path: "/reviews-&-history", display: "Reviews & History" },
  { path: "/contact", display: "Contact" },
];

const Header = React.memo(() => {
  const location = useLocation();
  const [showMobileNav, setShowMobileNav] = useState(false);
  const navigate = useNavigate();

  const toggleMobileNav = useCallback(() => {
    setShowMobileNav(prev => !prev);
  }, []);

  const handleNavigation = useCallback((path) => {
    navigate(path);
    if (showMobileNav) toggleMobileNav();
  }, [navigate, showMobileNav, toggleMobileNav]);

  return (
    <React.Fragment>
      <Headers>
        <Container>
          <Logo className="image">
            <img src={LogoImage} alt="Logo" />
          </Logo>
          <ItemsContainer>
            {navLinks.map((link, index) => (
              <Ul key={index}>
                <Li
                  onClick={() => handleNavigation(link.path)}
                  className={`group ${location.pathname === link.path ? 'active' : ''}`}
                >
                  {link.display}
                  <span></span>
                </Li>
              </Ul>
            ))}
          </ItemsContainer>
          <ContactBtnContainer>
            <Button onClick={() => handleNavigation('/contact')}>Request a call</Button>
            <MobileToggle onClick={toggleMobileNav}>
              <img src={mobtoggoleIcon} alt="Toggle Menu" />
            </MobileToggle>
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
                onClick={() => handleNavigation(link.path)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.display}
              </motion.p>
            ))}
          </MobileNavItems>
        </MobileNavContainer>
      )}
    </React.Fragment>
  );
});

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
    width: 80px;
    height: 80px;
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
  padding-bottom: 5px;
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

  &:hover, &.active {
    font-family: 'general-sans-medium';
    color: black;
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

const MobileToggle = styled.div`
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
  font-family: 'general-sans-semibold';
  color: var(--primary-cl);
  p {
    font-size: 20px;
    cursor: pointer;
    margin-bottom: 0;
    transition: color 0.3s ease;
    font-weight: bold;

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
