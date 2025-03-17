import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { getProducts } from './apiCore';
import ProductCard from './ProductCard';
import Search from './Search';

const Home = () => {
    const [productsBySell, setProductsBySell] = useState([]);
    const [productsByArrival, setProductsByArrival] = useState([]);
    const [error, setError] = useState(false);
    const loadProductsBySell = () => {
        getProducts('sold').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsBySell(data);
            }
        });
    };

    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            console.log(data);
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
        loadProductsBySell();
    }, []);

    return (
        
        <Layout 
            title="Bili.CA.NA.DIAN"
            description="High Quality Products from Canada"
            className="container-fluid"
        >
            <Search />
            <h2 className="mb-4">LATEST</h2>
            <div className="row">
                {productsByArrival.map((product, i) => (
                    <div key={i} className="col-12 col-md-6 col-lg-4 mb-5 pb-5">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
            <br />
            <h2 className="mb-4">POPULAR</h2>
            <div className="row">
                {productsBySell.map((product, i) => (
                    <div key={i} className="col-12 col-md-6 col-lg-4 mb-5 pb-5">
                        <ProductCard product={product} />
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Home;
