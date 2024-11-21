import React, { useState } from "react";
import styled from "styled-components";
import Colours from "../../assets/Colours/Colours";

const PageContainer = styled.div`
  padding: 20px;
  max-width: 800px;
  margin: auto;
`;

const Header = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  color: ${Colours.darkgray};
  margin-bottom: 30px;
  text-align: center;
`;

const FormContainer = styled.div`
  background: ${Colours.lightgray};
  padding: 25px;
  border-radius: 10px;
  margin-bottom: 30px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
  font-size: 1rem;
  color: ${Colours.darkgray};
  margin-bottom: 8px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid ${Colours.lightgray};
  margin-bottom: 20px;
  &:focus {
    outline: none;
    border-color: ${Colours.blue};
    box-shadow: 0 0 6px rgba(102, 166, 255, 0.3);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid ${Colours.lightgray};
  margin-bottom: 20px;
  resize: none;
  &:focus {
    outline: none;
    border-color: ${Colours.blue};
    box-shadow: 0 0 6px rgba(102, 166, 255, 0.3);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid ${Colours.lightgray};
  margin-bottom: 20px;
  &:focus {
    outline: none;
    border-color: ${Colours.blue};
    box-shadow: 0 0 6px rgba(102, 166, 255, 0.3);
  }
`;

const Button = styled.button`
  background: ${Colours.blue};
  color: #fff;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  &:hover {
    background: ${Colours.darkblue};
    box-shadow: 0 4px 10px rgba(85, 139, 211, 0.4);
  }
`;

const HistoryContainer = styled.div`
  margin-top: 30px;
`;

const HistoryHeader = styled.h2`
  font-size: 1.5rem;
  color: ${Colours.darkgray};
  margin-bottom: 15px;
  text-align: center;
  position: relative;
  &::after {
    content: "";
    display: block;
    width: 50%;
    height: 2px;
    background: ${Colours.lightgray};
    margin: 10px auto 0;
  }
`;

const NotificationCard = styled.div`
  background: ${Colours.white};
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NotificationTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${Colours.darkgray};
`;

const NotificationDate = styled.span`
  font-size: 0.9rem;
  color: ${Colours.gray};
`;

const NotificationContent = styled.p`
  color: ${Colours.gray};
  font-size: 1rem;
  margin-top: 10px;
`;

const Notifications = () => {
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notificationHistory, setNotificationHistory] = useState([
    {
      title: "System Update",
      date: "2024-10-10",
      time: "08:00 AM",
      content: "We are undergoing scheduled maintenance this weekend.",
    },
    {
      title: "Weather Alert",
      date: "2024-10-05",
      time: "03:00 PM",
      content: "Severe weather warning for your area. Stay safe!",
    },
  ]);

  const handleSendNotification = () => {
    const newNotification = {
      title: "New Notification",
      date,
      time,
      content: message,
    };

    setNotificationHistory([newNotification, ...notificationHistory]);
    setMessage("");
    setRecipient("");
    setDate("");
    setTime("");
    alert("Notification sent successfully!");
  };

  return (
    <PageContainer>
      <Header>Notification Center</Header>

      {/* Notification Form */}
      <FormContainer>
        <Label htmlFor="message">Description:</Label>
        <TextArea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your notification here..."
        />

        <Label htmlFor="recipient">Recipient:</Label>
        <Select
          id="recipient"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        >
          <option value="">Select recipient level</option>
          <option value="All Constituents">All Constituents</option>
          <option value="District Leaders">District Leaders</option>
          <option value="Village Leaders">Village Leaders</option>
        </Select>

        <Label htmlFor="date">Date:</Label>
        <Input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <Label htmlFor="time">Time:</Label>
        <Input
          type="time"
          id="time"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <Button onClick={handleSendNotification}>Send Notification</Button>
      </FormContainer>

      {/* Notification History */}
      <HistoryContainer>
        <HistoryHeader>Sent Notifications</HistoryHeader>
        {notificationHistory.length > 0 ? (
          notificationHistory.map((notification, index) => (
            <NotificationCard key={index}>
              <NotificationHeader>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationDate>
                  {notification.date} at {notification.time}
                </NotificationDate>
              </NotificationHeader>
              <NotificationContent>{notification.content}</NotificationContent>
            </NotificationCard>
          ))
        ) : (
          <p>No notifications sent yet.</p>
        )}
      </HistoryContainer>
    </PageContainer>
  );
};

export default Notifications;
