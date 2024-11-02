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

const FAQContainer = styled.div`
  background: ${Colours.lightgray};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Question = styled.h2`
  font-size: 1.1rem;
  font-weight: bold;
  color: ${Colours.blue};
  cursor: pointer;
  margin-bottom: 10px;
`;

const Answer = styled.p`
  color: ${Colours.gray};
  font-size: 0.95rem;
  margin-bottom: 20px;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;

const FAQUser = () => {
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswer = (index) => {
    setVisibleAnswers((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqData = [
    {
      question: "How do I reset my password?",
      answer: "Go to the settings page, and click on 'Reset Password'. Follow the prompts to complete the process.",
    },
    {
      question: "How can I update my profile information?",
      answer: "Navigate to your profile page, where you can edit and save your details.",
    },
    {
      question: "What should I do if I encounter a technical issue?",
      answer: "Please reach out via the Support & Feedback page, and we'll assist you as soon as possible.",
    },
  ];

  return (
    <PageContainer>
      <Header>Frequently Asked Questions</Header>
      <FAQContainer>
        {faqData.map((faq, index) => (
          <div key={index}>
            <Question onClick={() => toggleAnswer(index)}>{faq.question}</Question>
            <Answer isVisible={visibleAnswers[index]}>{faq.answer}</Answer>
          </div>
        ))}
      </FAQContainer>
    </PageContainer>
  );
};

export default FAQUser;
