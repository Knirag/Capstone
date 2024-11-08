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

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
  border: 1px solid ${Colours.lightgray};
  margin-bottom: 20px;
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

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${Colours.lightgray};
  margin-bottom: 20px;
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

const HistoryContainer = styled.div`
  margin-top: 20px;
`;

const NotificationCard = styled.div`
  background: ${Colours.white};
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const NotificationTitle = styled.h3`
  font-size: 1.1rem;
  color: ${Colours.darkgray};
`;

const NotificationDate = styled.span`
  font-size: 0.9rem;
  color: ${Colours.gray};
`;

const NotificationContent = styled.p`
  color: ${Colours.gray};
  font-size: 0.95rem;
  margin-top: 5px;
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
        <h2>Sent Notifications</h2>
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
