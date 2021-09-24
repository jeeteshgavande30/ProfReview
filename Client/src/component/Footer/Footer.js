import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';
const Footer = ()=>{
    return (
       
        <footer>
            <div className='footer-container'>
                <div className='footer-logo'>
                    <div className='logo-img'></div>
                    <span className='footer-logo1'>Prof</span>
                    <span className='footer-logo2'>Review</span>
                    <ul>
                    <li><a href = '/'><i class="fa fa-facebook-official" aria-hidden="true"></i>.</a></li>
                    <li><a href = '/'><i class="fa fa-twitter" aria-hidden="true"></i>.</a></li>
                    <li><a href = '/'><i class="fa fa-youtube-play" aria-hidden="true"></i>.</a></li>
                   </ul>
                </div>
                <div className='footer-aboutus'>
                    <h2>About Us</h2>
                    <p>
                        We as a company provides aur costumer the best information about the 
                        best faculty they can gat about a particular domain for their research work. 
                    </p>
                </div>
                <div className='footer-quicklinks'>
                    <h2>Quick Links</h2>
                    <ul>
                       <li> <Link to="/aboutus">About us</Link></li>
                       <li> <Link to="/contactus">Contact Us</Link></li>
                        <li><Link to="/policy">Privacy policy</Link></li>
                        <li><Link to="/policy">Terms and condition</Link></li>
                    </ul>
                </div>
            </div>
            <div  className='copyright'>
          <p>copyright  © 2021 ProfReview . All Rights Reserved.</p>
        </div>
        </footer>
      
    );
};
export default Footer;