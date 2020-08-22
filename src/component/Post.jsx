import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import { db } from "../firebase";
import PostComment from "./PostComment";
import useAuth from "./context/useAuth";
import "./post.css";

const Post = ({ postId, userAvatar, username, imageUrl, caption }) => {
  const [comments, setComments] = useState([]);
  const { user } = useAuth();

  const unsubscribe = db
    .collection("posts")
    .doc(postId)
    .collection("comments")
    .orderBy("timestamp", "desc")
    .onSnapshot((snapshot) =>
      setComments(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
    );

  useEffect(() => {
    if (postId)
      return () => {
        unsubscribe();
      };
  }, [postId, unsubscribe]);

  return (
    <div className="post">
      <div className="post__header">
        <Avatar className="post__avatar" alt={username} src={userAvatar} />
        <h4 className="post__username">{username}</h4>
      </div>
      <img className="post__image" src={imageUrl} alt={username} />
      <h4 className="post__caption">
        <strong>{username}</strong> {caption}
      </h4>
      {comments.length > 0 && (
        <div className="post__comments">
          {comments.map((comment) => (
            <p key={comment.id}>
              <b>{comment.username}</b> {comment.text}
            </p>
          ))}
        </div>
      )}

      {user && <PostComment postId={postId} username={user.displayName} />}
    </div>
  );
};

export default Post;
