import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import { addItem, updateItem, removeItem } from './cartHelpers';
import { isAuthenticated } from "../auth";
import "../App.css";

const ProductCard = ({
  product,
  showViewProductButton = true,
  showAddToCartButton = true,
  cartUpdate = false,
  showRemoveProductButton = false,
  setRun = f => f,
  run = undefined
  // changeCartSize
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const showViewButton = showViewProductButton => {
    return (
      showViewProductButton && (
        <Link to={`/product/${product._id}`} className="mr-2">
          <button className="btn btn-outline-secondary mt-2 mb-2 card-btn-1" id="submit">Show Product</button>
        </Link>
      )
    );
  };
  const addToCart = () => {
    // console.log('added');
    addItem(product, setRedirect(true));
  };

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddToCartBtn = showAddToCartButton => {
    return (
      showAddToCartButton && (
        <button onClick={addToCart} className="btn btn-outline-warning mt-2 mb-2 card-btn-1" id="addcart">
          Add to cart
        </button>
      )
    );
  };

  const showStock = quantity => {
    return quantity > 0 ? (
      <span className="badge badge-success badge"> In Stock </span>
    ) : (
      <span className="badge badge-danger badge"> Out of Stock </span>
    );
  };

  const handleChange = productId => event => {
    setRun(!run); // run useEffect in parent Cart
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };

  const showCartUpdateOptions = cartUpdate => {
    return (
      cartUpdate && (
        <div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text">Adjust Quantity</span>
            </div>
            <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />
          </div>
        </div>
      )
    );
  };
  const showRemoveButton = showRemoveProductButton => {
    return (
      showRemoveProductButton && (
        <button
          onClick={() => {
            removeItem(product._id);
            setRun(!run); // run useEffect in parent Cart
          }}
          className="btn btn-outline-danger mt-2 mb-2" id="remove"
        >
          Remove Product
        </button>
      )
    );
  };
  return (
      <div className="card h-100 w-100 p-2 border-0" id="cardstyle">
          <div className="card-header card-header-1" id="fontsize"><strong>{product.name}</strong></div>
            <div className="card-body img">
              {shouldRedirect(redirect)}
              <ShowImage item={product} url="product"/>
              <p className="card-text  mt-2" id="left"><strong>Description:</strong> {product.description.substring(0, 100)} </p>
              <p className="card-text black-9" id="left"><strong>Category: </strong>{product.category && product.category.name}</p>
              <p className="card-text black-8" id="left"><strong>Added on </strong>{moment(product.createdAt).fromNow()}</p>
              <p className="card-text black-10" id="left"><strong>Price: </strong><span>Rs.</span> {product.price}.00</p>
              <div id="left">
                {showStock(product.quantity)}
              </div>
              <br />
              <div id="left">
                {showViewButton(showViewProductButton)}
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <>
                {showAddToCartBtn(showAddToCartButton)}
                </>
                )}

              {showRemoveButton(showRemoveProductButton)}

              {showCartUpdateOptions(cartUpdate)}
            </div>
          </div>
      </div>

  );
};

export default ProductCard;
