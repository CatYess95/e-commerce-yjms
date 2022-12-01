import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Button, InputGroup, Form, Row, Col, ListGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { filterItemThunk, filterProductThunk, getProductThunk } from "../store/slices/product.slice";

const Home = () => {
    //PASOS PARA CONSUMIR UNA API - USEEFECT - AXIOS 

    const dispatch = useDispatch();
    const product = useSelector(state => state.product);

    //Categorias
    const [categoriesList, setCategoriesList] = useState([]);
    const [inputSearch, setInputSearch] = useState("");

    useEffect(() => {
        dispatch(getProductThunk());

        axios.get('https://e-commerce-api.academlo.tech/api/v1/products/categories')
            .then(res => setCategoriesList(res.data.data.categories));
    }, [])

    console.log(categoriesList);

    return (
        <div>
            <Row>
                {/*CATEGORIAS*/}
                <Col lg={3}>
                    <ListGroup className="cat">
                        {categoriesList.map(category => (
                            <ListGroup.Item onClick={() => dispatch(filterProductThunk(category.id))}
                                style={{ cursor: "pointer" }}
                                key={category.id}
                            >
                                {category.name}
                            </ListGroup.Item>
                        ))
                        }
                    </ListGroup>
                </Col>

                <Col lg={9}>
                    {/*PRODUCTOS*/}
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search product or id for example id 50 , 55"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={inputSearch}
                            onChange={e => setInputSearch(e.target.value)}
                        />
                        <Button
                            variant="outline-secondary" id="button-addon2"
                            onClick={() => dispatch(filterItemThunk(inputSearch))}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                            </svg>
                        </Button>
                    </InputGroup>

                    <Row xs={1} md={2} lg={3} className="g-4">
                        {product.map(productItem => (
                            <Col key={productItem.id}
                            >
                                <Card className="card-header">
                                    <Link to={`/product/${productItem.id}`} style={{ textDecoration: "none", color: "black" }}>

                                        <Card.Img className="card-img"
                                            variant="top"
                                            src={productItem.productImgs[1]}
                                            style={{ height: 200, objectFit: "contain" }}
                                        />
                                        <Card.Body className="card-body">
                                            <Card.Title className="card-title">{productItem.title}
                                            </Card.Title>
                                            <Card.Text>
                                                ${productItem.price}
                                                {productItem.category.price}
                                            </Card.Text>
                                            <Button variant='primary'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="btn-content" viewBox="0 0 16 16">
                                                    <path d="M9 5.5a.5.5 0 0 0-1 0V7H6.5a.5.5 0 0 0 0 1H8v1.5a.5.5 0 0 0 1 0V8h1.5a.5.5 0 0 0 0-1H9V5.5z" />
                                                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zm3.915 10L3.102 4h10.796l-1.313 7h-8.17zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z" />
                                                </svg>

                                            </Button>
                                        </Card.Body>
                                    </Link>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>

        </div>
    )
}

export default Home;