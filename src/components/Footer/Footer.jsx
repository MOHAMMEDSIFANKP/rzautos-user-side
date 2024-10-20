import React, { useEffect, useState } from "react";

import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import "../../styles/footer.css";
import { getHeadOfficeApi } from "../../services/services";

const quickLinks = [
  { path: "/", display: "Home" },
  { path: "/", display: "Car Buy" },
  { path: "/", display: "Reviews & History" },
  { path: "/contact", display: "Contact" },
];

const Footer = () => {
  const [headOffice, setHeadOffice] = useState({})

  const fetchData = async () => {
    try {
      const res = await getHeadOfficeApi();
      const { data, StatusCode } = res.data;
      if (StatusCode === 6000) {
        setHeadOffice(data[0]);
      } else {
        setHeadOffice({});
      }
    } catch (error) {
      setHeadOffice({});
    }
  };

  useEffect(() => {
    fetchData()
  }, [])
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col lg="4" md="4" sm="12">
            <div className="logo footer__logo">
              <h1>
                <Link to="/home" className=" d-flex align-items-center gap-2">
                  <img src="" alt="" />
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content">
              {headOffice?.footer_content}
            </p>
          </Col>
          <Col lg="4" md="4" sm="6" className="">
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
              <p className="office__info">{headOffice?.address}</p>
              <p className="office__info">Phone: {headOffice?.phone}</p>

              <p className="office__info">Email: {headOffice?.email}</p>

              <p className="office__info">Office Time: {headOffice?.office_hours}</p>
            </div>
          </Col>

          {/* <Col lg="3" md="4" sm="12">
            <div className="mb-4">
              <h5 className="footer__link-title">Newsletter</h5>
              <p className="section__description">Subscribe our newsletter</p>
              <div className="newsletter">
                <input type="email" placeholder="Email" />
                <span>
                  <i class="ri-send-plane-line"></i>
                </span>
              </div>
            </div>
          </Col> */}


        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
