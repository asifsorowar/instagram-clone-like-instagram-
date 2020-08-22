import React, { useState, useEffect } from "react";
import Post from "./component/Post";
import { db, auth } from "./firebase";
import SignUpModal from "./component/SignUpModal";
import LoginModal from "./component/LoginModal";
import Navigation from "./component/Navigation";
import AuthContext from "./component/context/authContext";
import ModalContext from "./component/context/modalContext";
import PostImage from "./component/PostImage";
import InstagramEmbed from "react-instagram-embed";
import "antd/dist/antd.css";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [signupOpen, setSignupOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);
  const [user, setUser] = useState(null);

  const getPosts = () => {
    db.collection("posts")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
      );
  };

  const unsubscribe = auth.onAuthStateChanged((authUser) => {
    if (authUser) {
      setUser(authUser);
    } else {
      setUser(null);
    }
  });

  useEffect(() => {
    getPosts();

    return () => {
      unsubscribe();
    };
  }, [posts, user, unsubscribe]);

  const handleScrollToTop = (e) => {
    window.scroll({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div
        className="scrollToTop"
        style={window.pageYOffset > 200 ? { opacity: 1 } : {}}
        onClick={handleScrollToTop}
      >
        TOP
      </div>
      <AuthContext.Provider value={{ user }}>
        <ModalContext.Provider
          value={{ signupOpen, setSignupOpen, loginOpen, setLoginOpen }}
        >
          <div className="App">
            <SignUpModal />
            <LoginModal />
            <Navigation />

            <div className="posts">
              <div className="app__postsLeft">
                {posts.map((post) => (
                  <Post
                    key={post.id}
                    postId={post.id}
                    username={post.username}
                    userAvatar={post.userAvatar}
                    imageUrl={post.imageUrl}
                    caption={post.caption}
                  />
                ))}
              </div>
              <div className="app_postsRight">
                <InstagramEmbed
                  url="https://instagr.am/p/Zw9o4/"
                  maxWidth={320}
                  hideCaption={false}
                  containerTagName="div"
                  protocol=""
                  injectScript
                  onLoading={() => {}}
                  onSuccess={() => {}}
                  onAfterRender={() => {}}
                  onFailure={() => {}}
                />
              </div>
            </div>
            {user && <PostImage />}
          </div>
        </ModalContext.Provider>
      </AuthContext.Provider>
    </>
  );
}

export default App;
