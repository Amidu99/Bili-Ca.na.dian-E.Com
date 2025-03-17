import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { signout, isAuthenticated } from "../auth";
import { itemTotal } from "./cartHelpers";
import logo from '../images/logo.png';
import cart from '../images/icons8-shopping-cart-48.png';

const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#ff9900" };
    } else {
        return { color: "#ffffff" };
    }
};

const AppNavbar = ({ history }) => (
    <div>
        <nav class="navbar navbar-expand-lg bg-nav fixed-top">
            <a class="navbar-brand" href="#shop" id="left">
                <Link
                    className="nav-link" as={Link} id="font"
                    style={isActive(history, "/shop")}
                    to="/"><img src={logo} alt="Bili.CA.NA.DIAN" id="hoverimg"/>Bili.CA.NA.DIAN
                </Link>
            </a>
            <button class="navbar-toggler me-3" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto fs-6">

                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item text-white" href="#shop">
                        <Link
                            className="nav-link mx-3"
                            style={isActive(history, "/shop")}
                            to="/shop"
                        >Shop
                        </Link>
                    </li>
                    )}
                    
                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item text-white" href="#cart">
                        <Link
                            className="nav-link mx-3"
                            style={isActive(history, "/cart")}
                            to="/cart"
                        >
                            <img src={cart} alt="cart" id="cart-image"/>{" "}
                            <sup>
                                <small className="cart-badge">{itemTotal()}</small>
                            </sup>Cart
                        </Link>
                    </li>
                    )}

                    {isAuthenticated() && isAuthenticated().user.role === 0 && (
                        <li className="nav-item mx-3" href="#user">
                            <Link
                                className="nav-link"
                                style={isActive(history, "/user/dashboard")}
                                to="/user/dashboard"
                            >My Profile
                            </Link>
                        </li>
                    )}

                    {isAuthenticated() && isAuthenticated().user.role === 1 && (
                        <li className="nav-item" href="#admin">
                            <Link
                                className="nav-link mx-3"
                                style={isActive(history, "/admin/dashboard")}
                                to="/admin/dashboard"
                            >Admin
                            </Link>
                        </li>
                    )}

                    {!isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item" href="#signin">
                                <Link
                                    className="nav-link mx-3"
                                    style={isActive(history, "/signin")}
                                    to="/signin"
                                >Sign In
                                </Link>
                            </li>

                            <li className="nav-item" href="#signup">
                                <Link
                                    className="nav-link mx-3"
                                    style={isActive(history, "/signup")}
                                    to="/signup"
                                >Sign Up
                                </Link>
                            </li>
                        </Fragment>
                    )}

                    {isAuthenticated() && (
                        <li className="nav-item" href="#shop">
                            <span
                                className="nav-link mx-3"
                                style={{ cursor: "pointer", color: "#ffffff" }}
                                onClick={() =>
                                    signout(() => {
                                        history.push("/");
                                    })
                                }
                            >Sign Out
                            </span>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    </div>
);

export default withRouter(AppNavbar);
