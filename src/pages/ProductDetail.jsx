import React, { useEffect } from "react";
import { Col, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductThunk } from "../store/slices/product.slice";

const ProductoDetail = () => {

    const { id } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getProductThunk());
    }, []);

    const productList = useSelector(state => state.product);

    //metodo para buscar datos en un arreglo - find muy parecido al map o al filter
    const product = productList.find(productItem => productItem.id === Number(id));
    const moreProduct = productList.filter(productItem => 
        productItem.category.id === product.category.id
        // &&
       // productItem.id !== moreProduct.id
        )

    return (
        <div>
            <h1>{product?.title}</h1>
            <Row>
                {/*DESCRIPCION DEL PRODUCTO*/}
                <Col lg={9}>
                    <img src={product?.productImgs[0]} alt="" className="img-fluid" />
                </Col>
                {/*PRODUCTOS RELACIONADOS*/}
                {/*key={productItem.id} */}
                <Col lg={3}>
                    <h3>Similar Products</h3>
                    <ListGroup 
                        variant="flush">
                        {moreProduct.map(productItem => (   
                            <ListGroup.Item key={productItem.id}>
                                <Link  to={`/product/${productItem.id}`}>
                                    {productItem.title}
                                    <img className="img-fluid" src={productItem.productImgs[0]} />
                                    ${productItem.price}
                                </Link>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Col>
            </Row>
        </div>
    );
};

export default ProductoDetail; 