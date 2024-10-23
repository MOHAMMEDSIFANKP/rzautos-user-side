import React, { useEffect, useState, useCallback } from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import { getHeadOfficeApi } from "../../services/services";

// Logo
import logo from '../../assets/all-images/logo/logo.png'
const quickLinks = [
  { path: "/", display: "Home" },
  { path: "/cars", display: "Car Buy" },
  { path: "/part-of-exchange", display: "Part of Exchange" },
  { path: "/reviews-and-history", display: "Reviews & History" },
  { path: "/contact", display: "Contact" },
];

const Footer = React.memo(() => {
  const [headOffice, setHeadOffice] = useState({});

  const fetchData = useCallback(async () => {
    try {
      const res = await getHeadOfficeApi();
      const { data, StatusCode } = res.data;
      if (StatusCode === 6000 && data.length > 0) {
        setHeadOffice(data[0]);
      } else {
        setHeadOffice({});
      }
    } catch (error) {
      console.error("Error fetching head office data:", error);
      setHeadOffice({});
    }
  }, []);

  // Fetch data only on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="4" sm="12">
            <div className="logo footer__logo">
              <h1>
                <Link to="/home" className="d-flex align-items-center gap-2">
                  <img width={70} src={logo} alt="Logo" />
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content">
              {headOffice?.footer_content || "Default footer content"}
            </p>
          </Col>
          <Col lg="4" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title">Quick Links</h5>
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="4" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title mb-4">Head Office</h5>
              <p className="office__info">{headOffice?.address || "N/A"}</p>
              <p className="office__info">Phone: {headOffice?.phone || "N/A"}</p>
              <p className="office__info">Email: {headOffice?.email || "N/A"}</p>
              <p className="office__info">Office Time: {headOffice?.office_hours || "N/A"}</p>
            </div>
          </Col>

        </Row>
        <div className="footer__bottom">
          {/* <p>&copy; {year} Your Company Name. All Rights Reserved.</p> */}
        </div>
      </Container>
    </footer>
  );
});

export default Footer;
