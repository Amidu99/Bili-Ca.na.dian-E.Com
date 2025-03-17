import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from './cartHelpers';
import ProductCard from './ProductCard';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <br />
                <h2>Your cart has {`${items.length}`} item/s</h2>
                <hr />
                {items.map((product, i) => (
                    <ProductCard
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
        <br />
            Your cart is empty! <br /> 
            <button id="continueshopping">
                <Link to="/shop" id="white" style={{ color: "white", textDecoration: "none" }}>Continue Shopping</Link>
            </button>
        </h2>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Add/Remove checkout or continue shopping."
            className="container-fluid"
        >
            <div className="row">
                <div className="col-6">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>

                <div className="col-6">
                    <br />
                    <h2 className="mb-4">Cart summary</h2>
                    <hr />
                    <Checkout products={items} setRun={setRun} run={run} />
                </div>
            </div>
        </Layout>
    );
};

export default Cart;
