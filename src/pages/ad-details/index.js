import React, { useEffect, useContext, useState } from "react";
import { withRouter } from "react-router-dom";
import { Carousel } from "react-bootstrap";
import { FirebaseContext } from "../../firebase";
import { Row, Col } from "react-bootstrap";

import styles from "./index.module.css";

const INITIAL_STATE = {
  brand: "",
  model: "",
  modification: "",
  category: "",
  milage: "",
  description: "",
  imageUrls: [],
  options: [],
};
const AdDetailsPage = (props) => {
  const { id } = props.match.params;
  const { firebase } = useContext(FirebaseContext);

  const [ad, setAd] = useState(INITIAL_STATE);

  useEffect(() => {
    firebase.getDoc("ads", id, setAd);
  }, [firebase, id]);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <Row md={12}>
        <Col md={6}>
          <Row>
            <Col>
              <h4>
                {ad.brand} {ad.model} {ad.modification}
              </h4>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col md={6}>
              <span>Цена: {ad.price} лв. </span>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <span>Първа регистрация: {ad.firstRegistration} г.</span>
            </Col>
            <Col md={6}>
              <span>Пробег: {ad.milage} км.</span>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <span>Категория: {ad.category} </span>
            </Col>
            <Col md={6}>
              <span>Скорости: {ad.transmission} </span>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <span>Гориво: {ad.engine} </span>
            </Col>
            <Col md={6}>
              <span>Мощност: {ad.power} кс.</span>
            </Col>
          </Row>
          <hr />
          <h5>Особенности и екстри:</h5>
          <Row>
            {ad.options.map((option, index) => (
              <Col key={index} md={4}>
                <span>{option}</span>
              </Col>
            ))}
          </Row>
          <hr />
          <h5>Информация: </h5>
          <p className={styles.text}>{ad.description}</p>
          <hr />
          <h5>За Контакти: </h5>
          <p>
            <span>{ad.phone}</span> - <span>{ad.creatorName}</span>
          </p>
        </Col>
        <Col className={styles.image} md={6}>
          <Carousel
            fade={true}
            interval={null}
            activeIndex={index}
            onSelect={handleSelect}
          >
            {ad.imageUrls.map((image, index) => (
              <Carousel.Item key={index}>
                <img className="d-block w-100" src={image} alt="" />
              </Carousel.Item>
            ))}
          </Carousel>
        </Col>
      </Row>
    </>
  );
};

export default withRouter(AdDetailsPage);
