import React, { useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPurchasesThunk } from "../store/slices/purchases.slice";

const Purchases = () => {
    const dispatch = useDispatch();
    //TRAENDO LOS PURCHASES DE REDUX
    const purchases = useSelector(state => state.purchases);
    
    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, []);

        //FORMATO PARA LA FECHA 
        const formatDate = (date) => {
            const months = [
                'Enero',
                'Febrero',
                'Marzo',
                'Abril',
                'Mayo',
                'Junio',
                'Julio',
                'Agosto',
                'Septiembre',
                'Octubre',
                'Noviembre',
                'Diciembre',
            ]
            // const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
            const newDate = new Date(date)
            // const day = days[newDate.getDay()]
            const day = newDate.getDate()
            const month = months[newDate.getMonth()]
            const year = newDate.getFullYear()
            return `${month} ${day}, ${year}`
        }
        console.log(purchases)    
    return (
        <div style = {{maxWidth:'900px', margin: '10% auto'}}>
            <h1>My Purchases</h1>
            <hr/>
           <ListGroup>
                {purchases.map(purchases => (
                        <div key={purchases.id}>
                            {purchases.cart.products?.map(product => (
                                <div key={product.id}
                                style={{    
                                    marginBottom: '15px',
                                    borderRadius: '20px',
                                    padding: '20px',
                                
                                    border : '5px solid #e3e3e3',
                            
                                }}>
                                <h5>
                                    {' '}
                                    <b>{formatDate(purchases.createdAt)}</b> {' '}
                                </h5>
                                    <Link to={`/product/${product.id}`} 
                                    style= {{textDecoration: 'none', color: 'black'}}
                                    className="products-purchases">
                                        <p><b>Product: 
                                            <br />
                                        </b>{product.title}</p>
                                        <p><b>Price:
                                            <br />
                                        </b> ${product.price}</p>
                                    </Link>   
                                </div>
                                ))}
                        </div>
                    ))
                }
        
            </ListGroup>
        </div>
    );
};

export default Purchases;