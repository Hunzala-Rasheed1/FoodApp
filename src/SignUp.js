import React, { useState } from "react";
import * as Components from "./Components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default function SignUp() {
  let navigate = useNavigate();
  const [credential, setCredential] = useState({
    Name: "",
    Password: "", // Changed Passwords to Password
    Email: "",
    GeoLocation: ""
  });
  const [signIn, toggle] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/CreateUser", { // Added http:// in URL
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },

        


        body: JSON.stringify({
          Name: credential.Name,
          Email: credential.Email,
          Password: credential.Password, // Changed Passwords to Password
          Location: credential.GeoLocation
        })
      });

      const json = await response.json();
      if (!json.success) {
        alert("Enter your credentials Valid");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch");
    }
  };
  const [credentialLogin, setCredentialLogin] = useState({
    Email: "",
    Password: "", // Changed Passwords to Password


  });


  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/LoginUser", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        
        body: JSON.stringify({
          Email: credentialLogin.Email,
          Password: credentialLogin.Password
        })
      });
  
      const json = await response.json();
      if (!json.success) {
        alert("Failed to log in");
      } else {
        localStorage.setItem("userEmail",credentialLogin.Email) 
        localStorage.setItem("authToken",json.authToken)
        console.log( "Setting authToken:",json.authToken)
        navigate("/"); 
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to fetch");
    }
  };
  


  const onType = (event) => {
    setCredential({ ...credential, [event.target.name]: event.target.value });
  };

  const onTypeLogin = (event) => {
    setCredentialLogin({ ...credentialLogin, [event.target.name]: event.target.value });
  };

  return (
    <MainContainer>
      <Components.Container>
        <Components.SignUpContainer signingIn={signIn}>
          <Components.Form onSubmit={handleSubmit}>
            <Components.Title1>Create Account</Components.Title1>
            <Components.Input type="text" placeholder="Name" name="Name" value={credential.Name} onChange={onType} />
            <Components.Input type="email" placeholder="Email" name="Email" value={credential.Email} onChange={onType} />
            <Components.Input type="password" placeholder="Password" name="Password" value={credential.Password} onChange={onType} />
            <Components.Input type="text" placeholder="Location" name="GeoLocation" value={credential.GeoLocation} onChange={onType} />
            <Components.Button type="submit">Sign Up</Components.Button>
          </Components.Form>
        </Components.SignUpContainer>
        <Components.SignInContainer signingIn={signIn}>
          <Components.Form onSubmit={handleSubmitLogin}>
            <Components.Title1>Sign in</Components.Title1>
            <Components.Input type="email" placeholder="Email" name="Email" value={credentialLogin.Email} onChange={onTypeLogin} />
            <Components.Input type="password" placeholder="Password" name="Password" value={credentialLogin.Password} onChange={onTypeLogin} />

            <Components.Anchor href="#">Forgot your password?</Components.Anchor>
            <Components.Button>Sign In</Components.Button>
          </Components.Form>
        </Components.SignInContainer>
        <Components.OverlayContainer signingIn={signIn}>
          <Components.Overlay signingIn={signIn}>
            <Components.LeftOverlayPanel signingIn={signIn}>
              <Components.Title>Welcome Back!</Components.Title>
              <Components.Paragraph>
                To keep connected with us please login with your personal info
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(true)}>
                Sign In
              </Components.GhostButton>
            </Components.LeftOverlayPanel>
            <Components.RightOverlayPanel signingIn={signIn}>
              <Components.Title>Hello, Friend!</Components.Title>
              <Components.Paragraph>
                Enter your personal details and start journey with us
              </Components.Paragraph>
              <Components.GhostButton onClick={() => toggle(false)}>
                Sign Up
              </Components.GhostButton>
            </Components.RightOverlayPanel>
          </Components.Overlay>
        </Components.OverlayContainer>
      </Components.Container>
    </MainContainer>
  );
}
