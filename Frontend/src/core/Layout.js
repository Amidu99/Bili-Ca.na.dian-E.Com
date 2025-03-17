import React from "react";
import AppNavbar from "./AppNavbar";
import "../App.css";

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div id="layout">
        <AppNavbar />
        <div className="jumbotron space-nav">
            <h2>{title}</h2>
            <p className="lead"><strong>{description}</strong></p>
            <div className={className}>{children}</div>
        </div>
    </div>
);

export default Layout;
