import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { GoEye, GoEyeClosed } from "react-icons/go";
import fLogo from "../../assets/Images/logo.png";
import instance from "../../../api";

const PageContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 1rem;
`;

const FormFadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 6px 30px rgba(0, 0, 0, 0.1);
  width: 360px;
  animation: ${FormFadeIn} 0.5s ease;
`;

const WebTitle = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Clogo = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 8px;
`;

const Title = styled.h2`
  margin: 1.5rem 0;
  color: #333;
  font-size: 1.7rem;
  font-weight: 600;
`;

const InputField = styled.div`
  width: 100%;
  margin-bottom: 1.4rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.6rem;
  font-size: 0.9rem;
  color: #555;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 1rem;
  color: #333;
  transition: border-color 0.3s;
  &:focus {
    outline: none;
    border-color: #66a6ff;
    box-shadow: 0 0 6px rgba(102, 166, 255, 0.2);
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
  color: #66a6ff;
  text-align: right;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 0.85rem;
  margin-top: 1.5rem;
  background-color: #66a6ff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  box-shadow: 0 4px 10px rgba(102, 166, 255, 0.3);
  transition: background-color 0.3s, box-shadow 0.3s;
  &:hover {
    background-color: #558bd3;
    box-shadow: 0 6px 15px rgba(85, 139, 211, 0.4);
  }
`;

const ToggleLink = styled.p`
  margin-top: 1rem;
  color: #66a6ff;
  font-size: 0.9rem;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [signupStep, setSignupStep] = useState(1);
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [signupFormData, setSignupFormData] = useState({
    username: "",
    email: "",
    role: "",
    password: "",
    repeatPassword: "",
  });
  const [locationData, setLocationData] = useState({
    district: "",
    sector: "",
    cell: "",
    village: "",
  });
  const [availableLocations, setAvailableLocations] = useState([]);
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  // Fetch locations from the server
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await instance.get("/locations/");
        console.log("Locations fetched successfully:", response.data);
        setAvailableLocations(response.data); // Update state with locations
      } catch (error) {
        console.error(
          "Error fetching locations:",
          error.response?.data || error.message
        );
      }
    };

    if (signupStep === 2) {
      fetchLocations();
    }
  }, [signupStep]);



const handleInputChange = (e, formType) => {
  const { name, value } = e.target;
  if (formType === "login") {
    setLoginFormData({ ...loginFormData, [name]: value });
  } else if (signupStep === 1) {
    setSignupFormData({ ...signupFormData, [name]: value });
  } else {
    setLocationData({ ...locationData, [name]: value });
  }
};

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

 const handleFormToggle = () => {
   setIsLogin(!isLogin);
   setSignupStep(1); // Reset signup step
   setError("");
 };

   const handleNextStep = (e) => {
     e.preventDefault();
     if (signupStep === 1) {
       // Validate first step
       const { username, email, password, repeatPassword, role } =
         signupFormData;
       if (
         !username ||
         !email ||
         !password ||
         password !== repeatPassword ||
         !role
       ) {
         setError("Please fill in all fields correctly.");
         return;
       }
       setError("");
       setSignupStep(2); // Proceed to location selection
     }
   };

   // Handle Login Submission
   const handleLogin = async (e) => {
     e.preventDefault();
     try {
       const response = await instance.post("/admin/login", loginFormData);
       const { token, admin } = response.data;

       if (
         ![
           "districtLeader",
           "sectorLeader",
           "cellLeader",
           "villageLeader",
         ].includes(admin.role)
       ) {
         setError("Access denied: Unauthorized role.");
         return;
       }

       localStorage.setItem("adminToken", token);
       localStorage.setItem("adminRole", admin.role);

       window.location.href = "/dashboard-admin";
     } catch (error) {
       console.error("Login Error:", error.response?.data || error.message);
       setError("Login failed. Please check your credentials.");
     }
   };

   // Handle Signup Submission
   const handleSignup = async (e) => {
     e.preventDefault();
     if (!locationData.district || !locationData.sector || !locationData.cell) {
       setError("Please fill in all location details.");
       return;
     }

     const finalSignupData = {
       ...signupFormData,
       location_id:
         signupFormData.role === "districtLeader"
           ? locationData.district
           : signupFormData.role === "sectorLeader"
           ? locationData.sector
           : signupFormData.role === "cellLeader"
           ? locationData.cell
           : locationData.village,
     };
     console.log("Final signup data:", finalSignupData);

     try {
       const response = await instance.post("/admin/signup", finalSignupData);
       console.log("Signup successful:", response.data);

       setIsLogin(true);
       setSignupStep(1);
     } catch (error) {
       console.error("Signup Error:", error.response?.data || error.message);
       setError("Signup failed. Please try again.");
     }
   };

  return (
    <PageContainer>
      <FormContainer>
        <WebTitle>
          <h3>Welcome to </h3>
          <Clogo src={fLogo} />
          <h3>Admin Portal</h3>
        </WebTitle>
        <Title>{isLogin ? "Login" : "Create Account"}</Title>

        {isLogin ? (
          <form onSubmit={handleLogin}>
            <InputField>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={loginFormData.username}
                onChange={(e) => handleInputChange(e, "login")}
                required
              />
            </InputField>
            <InputField>
              <Label>Password</Label>
              <PasswordContainer>
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  value={loginFormData.password}
                  onChange={(e) => handleInputChange(e, "login")}
                  required
                />
                <Icon onClick={togglePasswordVisibility}>
                  {isPasswordVisible ? <GoEye /> : <GoEyeClosed />}
                </Icon>
              </PasswordContainer>
              <ForgotPasswordLink href="#">Forgot Password?</ForgotPasswordLink>
              {error && <p style={{ color: "red" }}>{error}</p>}
            </InputField>
            <Button type="submit">Login</Button>
          </form>
        ) : signupStep === 1 ? (
          <form onSubmit={handleNextStep}>
            <InputField>
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                value={signupFormData.username}
                onChange={(e) => handleInputChange(e, "signup")}
                required
              />
            </InputField>
            <InputField>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={signupFormData.email}
                onChange={(e) => handleInputChange(e, "signup")}
                required
              />
            </InputField>
            <InputField>
              <Label>Role</Label>
              <select
                name="role"
                value={signupFormData.role}
                onChange={(e) => handleInputChange(e, "signup")}
                style={{
                  width: "100%",
                  padding: "0.9rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                  color: "#333",
                  backgroundColor: "#fff",
                }}
                required
              >
                <option value="">Select Role</option>
                <option value="cellLeader">Cell Leader</option>
                <option value="villageLeader">Village Leader</option>
              </select>
            </InputField>
            <InputField>
              <Label>Password</Label>
              <PasswordContainer>
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  value={signupFormData.password}
                  onChange={(e) => handleInputChange(e, "signup")}
                  required
                />
                <Icon onClick={togglePasswordVisibility}>
                  {isPasswordVisible ? <GoEye /> : <GoEyeClosed />}
                </Icon>
              </PasswordContainer>
            </InputField>
            <InputField>
              <Label>Repeat Password</Label>
              <PasswordContainer>
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  name="repeatPassword"
                  value={signupFormData.repeatPassword}
                  onChange={(e) => handleInputChange(e, "signup")}
                  required
                />
                <Icon onClick={togglePasswordVisibility}>
                  {isPasswordVisible ? <GoEye /> : <GoEyeClosed />}
                </Icon>
              </PasswordContainer>
            </InputField>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button type="submit">Next Step</Button>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <InputField>
              <Label>District</Label>
              <select
                name="district"
                value={locationData.district}
                onChange={(e) => handleInputChange(e, "location")}
                required
                style={{
                  width: "100%",
                  padding: "0.9rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                  color: "#333",
                  backgroundColor: "#fff",
                }}
              >
                <option value="">Select District</option>
                {availableLocations
                  .filter((loc) => loc.level === "district")
                  .map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
              </select>
            </InputField>
            <InputField>
              <Label>Sector</Label>
              <select
                name="sector"
                value={locationData.sector}
                onChange={(e) => handleInputChange(e, "location")}
                required
                style={{
                  width: "100%",
                  padding: "0.9rem",
                  borderRadius: "8px",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                  color: "#333",
                  backgroundColor: "#fff",
                }}
              >
                <option value="">Select Sector</option>
                {availableLocations
                  .filter(
                    (loc) =>
                      loc.level === "sector" &&
                      loc.parent_id === locationData.district
                  )
                  .map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name}
                    </option>
                  ))}
              </select>
            </InputField>

            {/* Cell Selection */}
            {["cellLeader", "villageLeader"].includes(signupFormData.role) && (
              <InputField>
                <label>Cell</label>
                <select
                  name="cell"
                  value={locationData.cell}
                  onChange={(e) => handleInputChange(e, "location")}
                  disabled={!locationData.sector} // Ensure sector is selected before enabling cell
                  style={{
                    width: "100%",
                    padding: "0.9rem",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                    color: "#333",
                    backgroundColor: "#fff",
                  }}
                >
                  <option value="">Select Cell</option>
                  {availableLocations
                    .filter(
                      (loc) =>
                        loc.level === "cell" &&
                        loc.parent_id === locationData.sector
                    )
                    .map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                </select>
              </InputField>
            )}

            {/* Village Selection */}
            {signupFormData.role === "villageLeader" && (
              <InputField>
                <label>Village</label>
                <select
                  name="village"
                  value={locationData.village}
                  onChange={(e) => handleInputChange(e, "location")}
                  disabled={!locationData.cell} // Ensure cell is selected before enabling village
                  style={{
                    width: "100%",
                    padding: "0.9rem",
                    borderRadius: "8px",
                    border: "1px solid #ccc",
                    fontSize: "1rem",
                    color: "#333",
                    backgroundColor: "#fff",
                  }}
                >
                  <option value="">Select Village</option>
                  {availableLocations
                    .filter(
                      (loc) =>
                        loc.level === "village" &&
                        loc.parent_id === locationData.cell
                    )
                    .map((loc) => (
                      <option key={loc.id} value={loc.id}>
                        {loc.name}
                      </option>
                    ))}
                </select>
              </InputField>
            )}

            {error && <p style={{ color: "red" }}>{error}</p>}
            <Button type="submit">Sign Up</Button>
          </form>
        )}

        <ToggleLink onClick={handleFormToggle}>
          {isLogin ? "Create an Account" : "Already have an account? Login"}
        </ToggleLink>
      </FormContainer>
    </PageContainer>
  );
};

export default LoginPage;
