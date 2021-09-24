import React, { Component } from "react";
import "./Template.css";
import { Link } from "react-router-dom";
//import Header from '../../Header/Header';
import Footer from "../../Footer/Footer";
import LoginModal from "../../LoginModal/LoginModal";
import Comment from '../../Comment/Comment';
class Template extends Component {
  state = {
    image: "",
    name: "",
    domain: "",
    college: "",
    breif: "",
    details: "",
    researchgate: "",
    email_id: "",
    comment:"",
    profileId:null,
    commentArray:[],
    isTextareaDisabled:true,
    islogin:false,
    isValid:true
  };
  componentDidMount() {
    const profileId = this.props.match.params.profileId;
    this.setState({profileId:profileId});
    console.log(localStorage.getItem('userName'));
    if(localStorage.getItem('userName')===null)
    {
      this.setState({islogin:false})
    }    
    else{
      this.setState({islogin:true})
    }
    fetch("http://localhost:8080/search/" + profileId)
      .then((res) => {
        if (res.status !== 200) {
          throw new Error("Failed to fetch Profile");
        }
       
        return res.json();
      })
      .then((resData) => {
        console.log(resData.post.image);
        this.setState({
          image: resData.post.image,
          name: resData.post.name,
          domain: resData.post.domain.split("\n"),
          college: resData.post.college,
          breif: resData.post.breif,
          details: resData.post.details,
          researchgate: resData.post.researchgate,
          email_id: resData.post.email_id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
      fetch("http://localhost:8080/comment/" + profileId)
      .then(res=>{
        if(res.status!==200)
        {
          throw new Error("Failed");
        }
        return res.json();
      })
      .then(result=>{
       
        this.setState({
          commentArray:result.comment.map(post=>{
            if(post.reviewId===this.state.profileId)
            {
              return {...post}
            }
          })
        })
      })
      .catch(err=>{
        console.log(err);
      })
     
    this.setState({ domainarray: this.state.domain.split("") });
   
  }
  onChangeHandler = (event)=>{
     if(this.state.islogin)
     {
       this.setState({isValid:true});
     }
     else{
       this.setState({isValid:false});
     }
     if(event.target.value==="")
     {
       this.setState({isTextareaDisabled:true})
     }
     else{
      this.setState({isTextareaDisabled:false})
     }
     this.setState({comment:event.target.value});
  }
  onDeleteClickBtn = (id)=>{
    if(window.confirm("Are you want to remove comment?"))
    {
      fetch('http://localhost:8080/comment/delete/'+id,{
        method:'DELETE'
      })
      .then(res=>{
        if(res.status!==200)
            {
                throw new Error('Deleting a post failed!');
            }
            return res.json();
      })
      .then(resData=>{
        
         this.setState({commentArray:this.state.commentArray.filter(p=>p._id!==resData.posts._id)})
         })
      
    }
  }
  formChangeHandler = (event)=>{
    event.preventDefault();
    
    fetch("http://localhost:8080/comment",{
        method:"PUT",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({
          comment:this.state.comment,
          profileId:this.state.profileId,
          name:localStorage.getItem("userName"),
          date:new Date().toISOString(),
          userId:localStorage.getItem("userId")
        })
      })
      .then(res=>{
        if(res.status!==201)
        {
          console.log("something went wrong");
          return ;
        }
        return res.json();
      })
      .then(resData=>{
        window.location.reload(true);
      })
      .catch(err=>{
        console.log(err);
      })
  }
  render() {
    
    return (
      <React.Fragment>
        
        <div className="template-container">
          <div className="template_header">
            <div className="template-header-link1">
              <Link to="/">
                <span>ProfReview</span>
              </Link>
            </div>
            <div className="template-header-link2">
              <Link to="/search">
                <span>Search</span>
              </Link>
            </div>
          </div>
          <div className="templateResearchFaculty">
            <p>Research Faculty</p>
          </div>
          <div className="templatediv">
            <div className="templateContent">
              <div className="templateContent1">
                <img
                  src={`/uploads/${this.state.image}`}
                  alt="..."
                  className="templateImage"
                ></img>
                <p>{this.state.name}</p>
                <span className="spn_domain">
                  Domains: <br></br>
                </span>
                <span className="spn_domain1">
                  {" "}
                  {this.state.domain[0]}
                  <br></br>
                  {this.state.domain[1]}
                  <br></br>
                  {this.state.domain[2]}
                </span>
              </div>
              <div className="templateContent2">
                <span>College:{this.state.college}</span>

                <p>{this.state.details}</p>
                <div className="templateContent2Links">Useful Links </div>
                <ul>
                  <li>
                    Profile: <a href={this.state.email_id}> {this.state.name}</a>
                  </li>
                  <li>
                    google schlr:
                    <a href={this.state.researchgate}>{this.state.name}</a>
                  </li>
                  <li>
                    College Site:
                    <a href="https://www.iiitkottayam.ac.in/#!/home">
                      {this.state.college}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="comment-box-container">
            <div className="comment-box">
              <h2>Disscusion</h2>
            </div>  
            <form onSubmit={this.formChangeHandler}>
              <textarea
                className="comment-form-textarea"
                value={this.state.comment}
                onChange={this.onChangeHandler}
                placeholder="Add to the discussion..."
              />
              <br></br>
              <button className="comment-form-button" disabled={this.state.isTextareaDisabled}>
                Submit
              </button>
              
    </form>
            {this.state.commentArray.map(post=>(
              post!==undefined &&
              <Comment
              key={post._id}
              id={post._id}
              name={post.name}
              date={new Date().toLocaleDateString('en-US')}
              comment={post.comment}
              userId = {post.userId}
              deleteBtnClick = {this.onDeleteClickBtn}
              />
               
            ))}
          </div>
        </div>
        {!this.state.isValid && <LoginModal/>}
        <Footer />
      </React.Fragment>
    );
  }
}
export default Template;
