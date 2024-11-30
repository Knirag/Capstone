import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as RiIcons from "react-icons/ri";
import * as IoIcons from "react-icons/io";
import Colours from "../../assets/Colours/Colours";

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
`;

const Header = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: ${Colours.darkgray};
  margin-bottom: 20px;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const Card = styled.div`
  background: ${({ bgColor }) => bgColor || Colours.skyblue};
  color: #fff;
  padding: 20px;
  flex: 1;
  position: relative;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const FadedIcon = styled.div`
  font-size: 4rem;
  opacity: 0.2;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const MonthlySelector = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${Colours.lightgray};
  font-size: 1rem;
  margin-bottom: 20px;
  display: block;
  margin-left: auto;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin-top: 30px;
`;

const LinkCard = styled(Link)`
  background: ${Colours.lightgray};
  color: ${Colours.darkgray};
  padding: 20px;
  flex: 1;
  border-radius: 8px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  transition: 0.3s;
  &:hover {
    background: ${Colours.blue};
    color: #fff;
  }
`;

const IconWrapper = styled.div`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const Dashboard = () => {
  const role = localStorage.getItem("adminRole");

  if (
    !["districtLeader", "sectorLeader", "cellLeader", "villageLeader"].includes(
      role
    )
  ) {
    return <p>Access denied: Admins only</p>;
  }
  return (
    <DashboardContainer>
      <Header>Dashboard</Header>

      <MonthlySelector>
        <option value="">Select Month</option>
        <option value="Jan">January</option>
        <option value="Feb">February</option>
        <option value="Mar">March</option>
      </MonthlySelector>

      <TopRow>
        <Card bgColor={Colours.blue}>
          <FadedIcon>
            <RiIcons.RiGroupLine />
          </FadedIcon>
          <h3>Constituents</h3>
          <p>14 Constituents</p>
          <Link
            to="/constituent-management"
            style={{ color: "#fff", textDecoration: "underline" }}
          >
            Manage Constituents
          </Link>
        </Card>
        <Card bgColor={Colours.green}>
          <FadedIcon>
            <FaIcons.FaBell />
          </FadedIcon>
          <h3>Active Notifications</h3>
          <p>10 Notifications</p>
          <Link
            to="/notification-center"
            style={{ color: "#fff", textDecoration: "underline" }}
          >
            View Notifications
          </Link>
        </Card>
        <Card bgColor={Colours.yellow}>
          <FadedIcon>
            <IoIcons.IoIosCheckmarkCircleOutline />
          </FadedIcon>
          <h3>Confirmations Received</h3>
          <p>6 Confirmations</p>
        </Card>
      </TopRow>

      <BottomRow>
        <LinkCard to="/constituent-management">
          <IconWrapper>
            <RiIcons.RiGroupLine />
          </IconWrapper>
          <h4>Constituent Management</h4>
        </LinkCard>
        <LinkCard to="/notification-center">
          <IconWrapper>
            <FaIcons.FaBell />
          </IconWrapper>
          <h4>Notification Center</h4>
        </LinkCard>
        <LinkCard to="/contact-support">
          <IconWrapper>
            <IoIcons.IoMdHelpCircleOutline />
          </IconWrapper>
          <h4>Support & Feedback</h4>
        </LinkCard>
        <LinkCard to="/constituent-analytics">
          <IconWrapper>
            <FaIcons.FaChartLine />
          </IconWrapper>
          <h4>Analytics</h4>
        </LinkCard>
      </BottomRow>
    </DashboardContainer>
  );
};

export default Dashboard;
