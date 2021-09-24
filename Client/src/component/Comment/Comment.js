import React,{Component} from 'react';
import './Comment.css';
class Comment extends Component{
  state={
      deletebtn:false
  }
  componentDidMount(){
    if(this.props.userId===localStorage.getItem("userId"))
    {
      this.setState({deletebtn:true})
    }
    else{
      this.setState({deletebtn:false})
    }
  }
  render(){
      return (
        <div className="comment_super">
          <div className="comment_container">
            <div className="comment_detail">
              <span>{this.props.name}</span>
              <span>{this.props.date}</span>
            </div>
            <div className="comment_para">
              <p>{this.props.comment}</p>
            </div>
            { this.state.deletebtn &&
              <button className="Comment_deletebtn" onClick={()=>{this.props.deleteBtnClick(this.props.id)}}>Delete</button>
            }
          </div>
        </div>
      );
  }
}
export default Comment;