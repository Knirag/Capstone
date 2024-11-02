// Login.js
import React, { useState } from "react";
import styled from "styled-components";
import { GoEye, GoEyeClosed } from "react-icons/go";

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #68e4fc, #0796d9);
  padding: 1rem;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 320px;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.5rem;
  font-weight: 600;
`;

const InputField = styled.div`
  width: 100%;
  margin-bottom: 1.2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: #555;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 1rem;
  color: #333;
  &:focus {
    outline: none;
    border-color: #0796d9;
    box-shadow: 0 0 5px rgba(7, 150, 217, 0.2);
  }
`;

const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const Icon = styled.div`
  position: absolute;
  right: 10px;
  cursor: pointer;
  color: #888;
`;

const ForgotPasswordLink = styled.a`
  display: block;
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: #0796d9;
  text-align: right;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  margin-top: 1.5rem;
  background-color: #0796d9;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s;
  &:hover {
    background-color: #067abb;
  }
`;

const ToggleLink = styled.p`
  margin-top: 1rem;
  color: #0796d9;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
  `;

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Sign Up

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <PageContainer>
      <FormContainer>
        <Title>{isLogin ? "Login" : "Create Account"}</Title>
        <InputField>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </InputField>

        <InputField>
          <Label>Password</Label>
          <PasswordContainer>
            <Input
              type={isPasswordVisible ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Icon onClick={togglePasswordVisibility}>
              {isPasswordVisible ? <GoEye /> : <GoEyeClosed />}
            </Icon>
          </PasswordContainer>
          <ForgotPasswordLink href="#">Forgot Password?</ForgotPasswordLink>
        </InputField>

        <Button>{isLogin ? "Login" : "Sign Up"}</Button>

        <ToggleLink onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? "Create an Account" : "Already have an account? Login"}
        </ToggleLink>
      </FormContainer>
    </PageContainer>
  );
};

export default LoginPage;
