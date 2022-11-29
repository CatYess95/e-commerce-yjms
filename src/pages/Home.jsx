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
                    <ListGroup>
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
                    <h1>Componente Home</h1>

                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Search product or id"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={inputSearch}
                            onChange={e => setInputSearch(e.target.value)}
                        />
                        <Button
                            variant="outline-secondary" id="button-addon2"
                            onClick={() => dispatch(filterItemThunk(inputSearch))}
                        >
                            Search
                        </Button>
                    </InputGroup>

                    <Row xs={1} md={2} lg={3} className="g-4">
                    {product.map(productItem => (
                            <Col key={productItem.id}>
                                <Card>
                                 <Link to={`/product/${productItem.id}`} style={{textDecoration:"none", color:"black"}}>
                                    <Card.Img 
                                    variant="top" 
                                    src= {productItem.productImgs[1]}
                                    style={{height:200, objectFit:"contain"}}
                                    />
                                    <Card.Body>
                                        <Card.Title>{productItem.title}</Card.Title>
                                        <Card.Text>
                                            ${productItem.price}
                                            {productItem.category.price}
                                            {productItem.description}
                                        </Card.Text>
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