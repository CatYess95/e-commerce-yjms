import React, { useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk, purchaseCartThunk } from "../store/slices/cart.slice";

const CartSidebars = ({ show, handleClose }) => {
    const dispach = useDispatch();
    const carts = useSelector((state) => state.cart)

    useEffect(() => {
        dispach(getCartThunk())
    }, []);

    //ELIMINAR PRODUCTO SELECCIONADO
    /*
    const deleteProduct = (data) => {
        dispach(deleteProductThunk(data.id))
    }
    */

    return (

        <Offcanvas show={show} onHide={handleClose} placement='end'>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Carrito de compras</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                {carts.map((carts) => {
                    return (
                        <div key={carts.id}>
                            <h5>{carts.title}</h5>
                            <p>{carts.price}</p>
                            <p>{carts.productsInCart.quantity}</p>
                            <hr />
                        </div>
                    )
                })}
                {/* 
                <div onClick={() => deleteProduct(carts)}> <i className="fa-solid fa-trash"></i></div>
                */}
            </Offcanvas.Body>

            <Button onClick={() => dispach(purchaseCartThunk())}>  
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" class="check" viewBox="0 0 16 16">
                    <path d="M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1H.5zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM9 5.5V7h1.5a.5.5 0 0 1 0 1H9v1.5a.5.5 0 0 1-1 0V8H6.5a.5.5 0 0 1 0-1H8V5.5a.5.5 0 0 1 1 0z" />
                </svg>
                Checkout
            </Button>

        </Offcanvas>
    );
};

export default CartSidebars;