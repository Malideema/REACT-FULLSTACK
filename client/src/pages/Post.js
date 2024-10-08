import React, { useEffect, useState, useCallback, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";


function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);  


  const fetchPostsHandler = useCallback(async () => { 
    const fetchPost = async () => {
    const response = await fetch(`/api/posts/byId/${id}`);
    const json = await response.json();
    response.ok && setPostObject(json);
    };
    const fetchComments = async () => {
      const response = await fetch(`/api/comments/${id}`);
      const json = await response.json();
      response.ok && setComments(json);
    };

    fetchPost();
    fetchComments();
  }, [id]);


    useEffect(() => {
      fetchPostsHandler();  
    }, [fetchPostsHandler]);
  
    useEffect(() => {
      axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
        setPostObject(response.data);
      });
  
      axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
        setComments(response.data);
      });
    }, [id]);


  const addComment = () => {
    axios
      .post("http://localhost:3001/comments", {
        commentBody: newComment,
        PostId: id,
      }, 
    {
      headers: {
        accessToken: localStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        if (response.data.error){
          alert(response.data.error);}
        else {
        const commentToAdd = { commentBody: newComment , username: response.data.username};
        setComments([...comments, commentToAdd]);
        setNewComment("");}
      });
  };

    const deleteComment = (id) => {
      axios
       .delete(`http://localhost:3001/comments/${id}`, {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        })
       .then(() => {
          setComments(comments.filter((val)=>{
            return val.id !== id;
          }));
          }
      );
    };


  return (
    <div className="container">
      <h1 className="page-title">{postObject.username}'s Post</h1>
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.title} </div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}</div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => {
              setNewComment(event.target.value);
            }}
          />
          <button onClick={addComment}> Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                {comment.commentBody}
                <div>
                <label> Username: {comment.username} </label>
                {authState.username === comment.username && <button onClick={()=> {deleteComment(comment.id)}}>X</button>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  </div>
  );
}

export default Post;