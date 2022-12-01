import React, { useEffect, useState } from "react";
import { Button, Card, Carousel, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addCartThunk } from "../store/slices/cart.slice";
import { getProductThunk } from "../store/slices/product.slice";

const ProductoDetail = () => {
    const { id } = useParams();
    const [quantity, setQuantity] = useState(1);
    const dispatch = useDispatch(); 

    useEffect(() => {
        setQuantity(1)
        dispatch(getProductThunk());
    }, [id]);

    const productList = useSelector(state => state.product);


    //metodo para buscar datos en un arreglo - find muy parecido al map o al filter
    const product = productList.find(productItem => productItem.id === Number(id));
    const moreProduct = productList.filter(productItem => 
        productItem.category.id == product.category.id &&
        productItem.id !== product.id
        )

    //Creando un estado para el input
    const [rate, setRate] = useState(5);
    
    //Añadir productos
    const addProducts = () => {
        const cuantity = {
            id,
            quantity,
            rate: rate
        }
       // console.log(product)
       dispatch(addCartThunk(cuantity));   
    }

    return (
        <Row>
            <Col>
                {product && <h2>{product?.title}</h2>}
                
            </Col>
            <br />
            <br />
            <Row>
                <Carousel style={{ background: 'aliceblue' }}>
                    <Carousel.Item interval={1000} style={{ width: '300px' }}>
                        <img
                            className='d-block w-100'
                            src={product?.productImgs[0]}
                            alt='First slide'
                        />
                    </Carousel.Item>
                    <Carousel.Item interval={500} style={{ width: '300px' }}>
                        <img
                            className='d-block w-100'
                            src={product?.productImgs[1]}
                            alt='First slide'
                        />
                    </Carousel.Item>
                    <Carousel.Item style={{ width: '300px' }}>
                        <img
                            className='d-block w-100'
                            src={product?.productImgs[2]}
                            alt='First slide'
                        />
                    </Carousel.Item>
                </Carousel>
            </Row>
            <hr />
            <div className='quantity' style={{ display: 'flex' }}>
                    <Button className='me-3' onClick={() => setRate(rate - 1)}>
                        -
                    </Button>
                    { rate }
                    <Button className='me-3' onClick={() => setRate(rate + 1)}>
                        +
                    </Button>
                    <Button className='me-3' onClick={addProducts}>
                        Add to cart
                    </Button>
                </div>
             
            <h4>Descripción:</h4>
            <p> {product?.description}</p>
            <hr />
            <h4>Productos Relacionados</h4>
            <Row xs={2} md={4} xl={8} className='g-4'>
                {moreProduct.map((product) => (
                    <Col key={product.id}>
                        <Link to={`/product/${product.id}`}>
                            <Card
                                style={{
                                    width: '100%',
                                    cursor: 'pointer',
                                    alignItems: 'center',
                                    height: '500px',
                                    overflowY: 'scroll',
                                }}>
                                <Card.Img
                                    variant='top'
                                    src={product.productImgs[2]}
                                    style={{
                                        width: '90%',
                                        height: '300px',
                                        padding: '10px',
                                        objectFit: 'contain',
                                    }}
                                />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </Row>
    )
}
        
           

export default ProductoDetail; 