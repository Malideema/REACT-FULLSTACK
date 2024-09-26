import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

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
        accessToken: sessionStorage.getItem("accessToken"),
      },
    })
      .then((response) => {
        if (response.data.error){
          alert(response.data.error);}
        else {
        const commentToAdd = { commentBody: newComment };
        setComments([...comments, commentToAdd]);
        setNewComment("");}
      });
  };

  return (
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
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Post;