import React, { useState, useContext } from "react";

import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import { UserContext } from "../../App";
import { useHistory, useLocation } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    issignedIn: false,
    name: "",
    email: "",
    password: "",
  });

  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  let history = useHistory();
  let location = useLocation();
  console.log(location);
  console.log(history);
  let { from } = location.state || {
    from: { pathname: "/placeandmap" },
  };
  console.log(from);

  const provider = new firebase.auth.GoogleAuthProvider();
  const fbprovider = new firebase.auth.FacebookAuthProvider();

  const handleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        const { displayName, photoUrl, email } = res.user;
        const signedInUser = {
          isSignedIn: true,
          name: displayName,
          email: email,
          password: photoUrl,
        };
        setUser(signedInUser);
        history.replace(from);
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then((res) => {
        const signedOutUser = {
          isSignedIn: false,
          name: "",
          email: "",
          password: "",
          error: "",
          success: false,
          newUser: false,
        };
        setUser(signedOutUser);
      })
      .catch(function (error) {
        // An error happened.
      });
  };

  const handleSubmit = (e) => {
    if (user.email && user.password) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          let newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);

          history.replace(from);
        })
        .catch(function (error) {
          var errorMessage = error.message;

          let newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        });
    }
    if (!newUser && user.email && user.password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(user.email, user.password)
        .then((res) => {
          let newUserInfo = { ...user };
          newUserInfo.error = "";
          newUserInfo.success = true;
          setUser(newUserInfo);
        })
        .catch(function (error) {
          var errorMessage = error.message;
          // ...
          let newUserInfo = { ...user };
          newUserInfo.error = errorMessage;
          newUserInfo.success = false;
          setUser(newUserInfo);
          setLoggedInUser(newUserInfo);
          history.replace(from);
        });
    }
    e.preventDefault();
  };

  const handleBlur = (event) => {
    let isFieldValid = true;
    //let isEmailValid, isNameValid;
    if (event.target.name === "email") {
      let isEmailValid = /\S+@\S+\.\S+/.test(event.target.value);
      console.log(isEmailValid);
    }
    if (event.target.name === "password") {
      const isNameValid = event.target.value.length > 6;
      console.log(isNameValid);
    }
    //isFieldValid = isEmailValid && isNameValid;
    if (isFieldValid) {
      let newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  };
  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbprovider)
      .then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        history.replace(from);
        // ...
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
  };

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <p>
          Try logging into the system by using your email and password (google
          and fb sign in isn't working 100% at the moment)
        </p>
        {user.isSignedIn ? (
          <button onClick={handleSignOut}>sign out from google account</button>
        ) : (
          <button onClick={handleSignIn}>sign in using google</button>
        )}
        <br />
        <button onClick={handleFbSignIn}>sign in using facebook</button>
        {/* <button onClick={handleSignIn}>sign in</button> */}
        {user.isSignedIn && <p>welcome {user.name}</p>}
        <br></br>
        <input
          name="newUser"
          onChange={() => {
            setNewUser(!newUser);
          }}
          id=""
          type="checkbox"
          value=""
        />
        <label htmlFor="newUser">New User Sign Up</label>
        <form onSubmit={handleSubmit}>
          {newUser && (
            <input type="text" name="name" required onBlur={handleBlur} />
          )}
          <br></br>
          <input type="text" name="email" required onBlur={handleBlur} />
          <br></br>
          <input type="password" name="password" required onBlur={handleBlur} />
          <br></br>
          <input type="submit" value={newUser ? "sign up" : "sign in"} />
        </form>
        <p>{user.error}</p>
        {user.success && (
          <p>User {newUser ? "created" : "logged in"} successfully</p>
        )}
      </div>
    </>
  );
}

export default Login;
