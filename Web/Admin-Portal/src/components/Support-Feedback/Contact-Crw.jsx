import React, { useState } from "react";
import styled from "styled-components";
import Colours from "../../assets/Colours/Colours";

const PageContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Header = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${Colours.darkgray};
  margin-bottom: 20px;
`;

const FormContainer = styled.div`
  background: ${Colours.lightgray};
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${Colours.darkgray};
  margin-bottom: 8px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid ${Colours.lightgray};
  margin-bottom: 20px;
  resize: none;
`;

const Button = styled.button`
  background: ${Colours.blue};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  &:hover {
    background: ${Colours.darkblue};
  }
`;

const RequestContainer = styled.div`
  margin-top: 20px;
`;

const RequestCard = styled.div`
  background: ${Colours.white};
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const ContactCrw = () => {
  const [message, setMessage] = useState("");
  const [supportRequests, setSupportRequests] = useState([
    {
      name: "Jane Doe",
      date: "2024-10-15",
      content: "I need help with my account settings.",
    },
  ]);

  const handleSubmitFeedback = () => {
    const newRequest = {
      name: "Anonymous User",
      date: new Date().toLocaleDateString(),
      content: message,
    };
    setSupportRequests([newRequest, ...supportRequests]);
    setMessage("");
    alert("Feedback submitted successfully!");
  };

  return (
    <PageContainer>
      <Header>Support & Feedback</Header>

      {/* Feedback Form */}
      <FormContainer>
        <Label htmlFor="message">Submit Feedback:</Label>
        <TextArea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your issue or feedback..."
        />
        <Button onClick={handleSubmitFeedback}>Submit</Button>
      </FormContainer>

      {/* Support Requests */}
      <RequestContainer>
        <h2>Recent Support Requests</h2>
        {supportRequests.map((request, index) => (
          <RequestCard key={index}>
            <strong>{request.name}</strong> | <em>{request.date}</em>
            <p>{request.content}</p>
          </RequestCard>
        ))}
      </RequestContainer>
    </PageContainer>
  );
};

export default ContactCrw;
