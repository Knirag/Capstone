import React, { useState } from "react";
import styled from "styled-components";
import Colours from "../../assets/Colours/Colours";

const PageContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
  background-color: ${Colours.lightgray};
  border-radius: 8px;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
`;

const Header = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${Colours.darkgray};
  text-align: center;
  margin-bottom: 20px;
`;

const SubHeader = styled.h2`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${Colours.gray};
  margin-bottom: 20px;
  border-bottom: 2px solid ${Colours.lightblue};
  padding-bottom: 10px;
`;

const FormContainer = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${Colours.darkgray};
  margin-bottom: 8px;
  display: block;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid ${Colours.lightgray};
  margin-bottom: 20px;
  resize: none;
  transition: border-color 0.3s;
  &:focus {
    border-color: ${Colours.blue};
    outline: none;
    box-shadow: 0 0 5px rgba(102, 166, 255, 0.4);
  }
`;

const Button = styled.button`
  background: ${Colours.blue};
  color: #fff;
  padding: 12px 25px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
  &:hover {
    background: ${Colours.darkblue};
    transform: translateY(-2px);
  }
`;

const RequestContainer = styled.div`
  margin-top: 30px;
`;

const RequestCard = styled.div`
  background: #fff;
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-left: 5px solid ${Colours.blue};
`;

const RequestHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RequestName = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${Colours.darkgray};
`;

const RequestDate = styled.span`
  font-size: 0.9rem;
  color: ${Colours.gray};
`;

const RequestContent = styled.p`
  font-size: 0.95rem;
  color: ${Colours.gray};
  margin-top: 10px;
  line-height: 1.5;
`;

const ContactCrw = () => {
  const [message, setMessage] = useState("");
  const [supportRequests, setSupportRequests] = useState([
    {
      name: "Aline Mukamana",
      date: "2024-10-15",
      content: "What time is the budgeting meeting ?",
    },
    {
      name: "Mugisha Thierry",
      date: "2024-10-14",
      content: "I have not recieved a notification for Umuganda this month",
    },
  ]);

  const handleSubmitFeedback = () => {
    if (message.trim() === "") {
      alert("Please enter a message.");
      return;
    }

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
        <SubHeader>Submit Feedback</SubHeader>
        <Label htmlFor="message">Describe your issue or feedback:</Label>
        <TextArea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your feedback here..."
        />
        <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
      </FormContainer>

      {/* Support Requests */}
      <RequestContainer>
        <SubHeader>Recent Support Requests</SubHeader>
        {supportRequests.length > 0 ? (
          supportRequests.map((request, index) => (
            <RequestCard key={index}>
              <RequestHeader>
                <RequestName>{request.name}</RequestName>
                <RequestDate>{request.date}</RequestDate>
              </RequestHeader>
              <RequestContent>{request.content}</RequestContent>
            </RequestCard>
          ))
        ) : (
          <p>No support requests available.</p>
        )}
      </RequestContainer>
    </PageContainer>
  );
};

export default ContactCrw;
