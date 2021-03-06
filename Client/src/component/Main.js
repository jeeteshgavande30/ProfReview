import React,{useRef} from 'react';
import Header from './Header/Header';
import './Main.css';
import Cards from './Card/Cards';
import Svg from './svg';
//import { Link } from 'react-router-dom';
import Cards1 from './Card/Cards1';
import Footer from './Footer/Footer';
import Rating from '../component/Rating/Rating';
const Main = (props)=>{
  let body = useRef();
  
  const buttonHandler = (event)=>{
    props.button(event.target.value);
     
  }

  return (<div className='home' ref={body}>
       
     <Header  body = {body} onLogout = {props.onLogout} isAuth={props.isAuth} userName={props.userName} url = {props.url}/>
     <div className='front-part'>
      
          <div className='text'>
                <div className='sp1'>The great place</div>
                <br></br>
                <div className='sp2'>Research Enthusiast</div>
                <br></br>
                <br></br>
                <span className='sp3'>Here we provide Students best research faculty </span>
                <br></br>
                <span className='sp3'>allover india.</span>
          </div>
          <div className='svg'>
             
              <Svg ></Svg>
          </div>
    
     </div>
     <div className='front-part1'>
        <h2 className='front-part1-headline'>Professor Mania</h2>
     <div className='front-part1-cards'>
       <Cards/>
       </div> 
     </div>
     <div className='front-part1_1'>
      <div className='text1'>
         <span>Connect With Faculties in Your Favourite Subject</span>
         <p>Share your Research ideas with your favrouite faculty and get a chance to work on them</p>
      </div>
      <div className="alignbtns">
        <p className="btn-para">Most Visited Topic Page</p>
        <div className="button-div">
          <button className="btn1" onClick={buttonHandler} value="Cloud">Cloud</button>
          <button className="btn2" onClick={buttonHandler} value="graph theory">Graph theory</button>
          <button className="btn3" onClick={buttonHandler} value="machine learning">Machine learning</button>
          <button className="btn4" onClick={buttonHandler} value="artificial intelligence">Artificial Intelligence</button>
          
        </div>
      </div>
    </div>
    <div className="rating-div-parent">
        <div className="rating-div">
            <Rating isAuth = {props.isAuth} rating = {props.rating} body={body}/>
        </div>
    </div>
    <div className='front-part2'>
      <h2 className='front-part2-headline'>Testimonials</h2>
      <p className='front-part2-para'>Aur latest Reviews</p>
      <div className='front-part2-cards'>
        <Cards1></Cards1>
      </div> 
    </div>

     <Footer/>
     
  </div>);
}
export default Main;