import { useState, Fragment, useEffect } from "react";
import { Card, Menu, Form, Button } from "semantic-ui-react";
import { Redirect } from 'react-router';
import { auth, authUI } from "../firebase";

import "../css/AuthForm.css";

import firebase from 'firebase/app';
import 'firebase/auth';

async function authenticateUser(email, password, isLogin) {
  try {
    const user = isLogin
      ? await auth.signInWithEmailAndPassword(email, password)
      : await auth.createUserWithEmailAndPassword(email, password);
    console.log(user);
  } catch (err) {
    console.log(err);
  }
}

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [user, setUser] = useState(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  
  auth.onAuthStateChanged((user) => setUser(user));
  
  useEffect(() => {
    if (!user) {
      authUI.start(".google-login", {
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
        signInFlow: "redirect",
      });
    }
  }, [user]);

  return (
    <div>
    <div><h3>Please log in or sign up below in order to view your restaurant to-do list. While logged in, you can add entries, edit and delete previous entries, and mark entries as complete.</h3>
    </div>
    <div className="auth-form-wrapper">
      <Card className="auth-form-card">
        <Card.Content>
          {user ? (
            <Redirect to="/list" />
          ) : (
            <Fragment>
              <Card.Header className="auth-form-header">Restaurant Passport</Card.Header>
              <Menu compact secondary>
                <Menu.Item
                  name="Login"
                  onClick={() => setIsLogin(true)}
                  active={isLogin}
                ></Menu.Item>
                <Menu.Item
                  name="Sign up"
                  onClick={() => setIsLogin(false)}
                  active={!isLogin}
                ></Menu.Item>
              </Menu>
              {isLogin ? (
                <Fragment>
                  <Form>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Email</label>
                      <input
                        placeholder="Email Address"
                        name="loginEmail"
                        type="email"
                        value={loginEmail || ""}
                        onChange={(e) => setLoginEmail(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Password</label>
                      <input
                        placeholder="Password"
                        name="loginPassword"
                        type="password"
                        value={loginPassword || ""}
                        onChange={(e) => setLoginPassword(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Button
                      onClick={() => authenticateUser(loginEmail, loginPassword, true)}
                      className="auth-form-buttons"
                      color="green"
                    >
                      Login
                    </Button>
                  </Form>
                  <div className="google-login"></div>
                </Fragment>
              ) : (
                <Fragment>
                  <Form>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Email</label>
                      <input
                        placeholder="Email Address"
                        name="signUpEmail"
                        type="email"
                        value={signupEmail || ""}
                        onChange={(e) => setSignupEmail(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Form.Field className="auth-form-fields">
                      <label className="form-labels">Password</label>
                      <input
                        placeholder="Password"
                        name="signUpPassword"
                        type="password"
                        value={signupPassword || ""}
                        onChange={(e) => setSignupPassword(e.target.value)}
                      ></input>
                    </Form.Field>
                    <Button
                      className="auth-form-buttons"
                      color="teal"
                      onClick={() => authenticateUser(signupEmail, signupPassword, false)}
                    >
                      Sign up
                    </Button>
                  </Form>
                  <div className="google-login"></div>
                </Fragment>
              )}
            </Fragment>
          )}
        </Card.Content>
      </Card>
    </div>
    </div>
  );
}

export default AuthForm;
