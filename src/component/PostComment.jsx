import React from "react";
import AppForm from "./common/AppForm";
import Input from "./common/Input";
import * as Yup from "yup";
import SubmitButton from "./common/SubmitButton";
import { db } from "../firebase";
import firebase from "firebase";
import "./postComment.css";

const PostComment = ({ postId, username }) => {
  let validateSchema = Yup.object().shape({
    text: Yup.string().required().label("Comment"),
  });

  const handleSubmit = ({ text }, { resetForm }) => {
    db.collection("posts")
      .doc(postId)
      .collection("comments")
      .add({
        text,
        username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });

    resetForm("");
  };

  return (
    <div className="commentBox">
      <AppForm
        initialValues={{ text: "" }}
        onSubmit={handleSubmit}
        validationSchema={validateSchema}
      >
        <form className="comment__form">
          <div className="commentInput">
            <Input
              name="text"
              placeholder="Leave a comment"
              color="primary"
              variant="outlined"
              error={false}
            />
          </div>
          <SubmitButton
            label="comment"
            color="primary"
            size="small"
            variant="outlined"
          />
        </form>
      </AppForm>
    </div>
  );
};

export default PostComment;
