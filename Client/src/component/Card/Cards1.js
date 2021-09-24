import React,{Component} from "react";
import "./Cards1.css";


import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

//Owl Carousel Settings
class Cards1 extends  Component{
    state={
        data:[],
        name:'',
        count:0
    }
     
    componentDidMount(){
        
        this.setState({name:localStorage.getItem("userName")});
        fetch("http://localhost:8080/rating")
        .then(res=>{
            if(res.status!==200)
            { console.log("error");
                return;
            }
            return res.json();
        })
        .then(resData=>{
          this.setState({data:resData.ratings})    
        
        })
        .catch(err=>{
            console.log(err);

        })
       
    }
    render(){
  return (
        <React.Fragment>
        <div className="card1-container">
    
            {this.state.data.map(post=>{
                
              if (this.state.count<4)
              { this.state.count++;
                return  <div className="card1-main">
                    <div className="card1-heading">
                        <h1 className="profile1-name">{post.user}</h1>
                        
                            <p className="profile1-position">
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            <i class="fa fa-star" aria-hidden="true"></i>
                            </p>
                        
                        
                    </div>
                    <p className="profile1-body">
                        {post.message}
                    </p>
                    </div>
              }      
            })}
        
            
            

       
        </div>
        </React.Fragment>
    );
    }
};
export default Cards1;