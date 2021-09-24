import React from 'react';
import './Error.css';
import { Link } from 'react-router-dom';
//import error404 from '../../../public/uploads/error404.svg';
const Error404 = ()=>{
    
    
    return (
        <div className="error404-container">
            <div className="error404-div">
                <div className="error404-header">
                    <h2>Oops! Page not found</h2>
                </div>
                <div className="error404-span">
                    <span>404</span>
                </div>
                <div className="error404-header2">
                    <h2>we can't find the page you're looking for.</h2>
                </div>
                <div className="error404-button">
                  <Link to="/">
                    <button className="error404-btn">Back to Home</button>
                  </Link>  
                </div>
            </div>
        </div>
    );
}
export default Error404;