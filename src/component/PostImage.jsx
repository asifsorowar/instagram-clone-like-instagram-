import React, { useState } from "react";
import AppForm from "./common/AppForm";
import SubmitButton from "./common/SubmitButton";
import * as Yup from "yup";
import ImageUpload from "./common/ImageUpload";
import Input from "./common/Input";
import "./postImage.css";
import { db, storage } from "../firebase";
import firebase from "firebase";
import useAuth from "./context/useAuth";
import { Progress } from "antd";

const PostImage = () => {
  const [progress, setProgress] = useState(0);
  const { user } = useAuth();

  let validateSchema = Yup.object().shape({
    caption: Yup.string().required().label("Caption"),
    image: Yup.array().min(1).label("Image"),
  });

  const handleSubmit = ({ image, caption }, { resetForm }) => {
    const imageFile = image[0];
    const uploadTask = storage.ref(`images/${imageFile.name}`).put(imageFile);

    uploadTask.on(
      "state_changed",

      (snapshot) => {
        // progress function.....
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },

      (error) => {
        console.log(error);
        alert(error.message);
      },

      () => {
        storage
          .ref("images")
          .child(imageFile.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("posts").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              caption: caption,
              imageUrl: url,
              username: user.displayName,
            });

            setProgress(0);
            resetForm("");
          });
      }
    );
  };

  return (
    <div className="postImage">
      <div className="innerContainer">
        <Progress
          strokeColor={{
            "0%": "#108ee9",
            "100%": "#87d068",
          }}
          percent={progress}
        />
        <AppForm
          initialValues={{ caption: "", image: {} }}
          onSubmit={handleSubmit}
          validationSchema={validateSchema}
        >
          <form className="post__form">
            <ImageUpload name="image" />
            <Input
              name="caption"
              label="Caption"
              color="primary"
              placeholder="Enter a Caption"
            />
            <SubmitButton
              label="Post"
              color="primary"
              className="submitButton"
            />
          </form>
        </AppForm>
      </div>
    </div>
  );
};

export default PostImage;
