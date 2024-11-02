import React, { useState } from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import Colours from "../../assets/Colours/Colours";

const PageContainer = styled.div`
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

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${Colours.lightgray};
  margin-left: 10px;
`;

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  flex: 1;
  padding: 20px;
  background-color: ${Colours.lightgray};
  border-radius: 8px;
  text-align: center;
  margin: 0 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.h3`
  font-size: 1.2rem;
  color: ${Colours.darkgray};
`;

const StatValue = styled.p`
  font-size: 1.5rem;
  color: ${Colours.blue};
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const Analytics = () => {
  const [dateRange, setDateRange] = useState("Monthly");

  // Mock data for charts
  const constituentData = [
    { name: "Week 1", constituents: 40 },
    { name: "Week 2", constituents: 50 },
    { name: "Week 3", constituents: 45 },
    { name: "Week 4", constituents: 60 },
  ];

  const notificationData = [
    { name: "Read", value: 400 },
    { name: "Unread", value: 200 },
  ];

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  return (
    <PageContainer>
      <Header>Analytics Dashboard</Header>

      {/* Filter */}
      <FilterContainer>
        <label htmlFor="date-range">Date Range:</label>
        <Select
          id="date-range"
          value={dateRange}
          onChange={handleDateRangeChange}
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Monthly">Monthly</option>
        </Select>
      </FilterContainer>

      {/* Statistic Cards */}
      <StatContainer>
        <StatCard>
          <StatTitle>Total Constituents</StatTitle>
          <StatValue>1,240</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Notifications Sent</StatTitle>
          <StatValue>320</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Engagement Rate</StatTitle>
          <StatValue>65%</StatValue>
        </StatCard>
      </StatContainer>

      {/* Charts */}
      <ChartContainer>
        {/* Line Chart - New Constituents Over Time */}
        <div>
          <h3>Constituent Growth</h3>
          <LineChart width={400} height={300} data={constituentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="constituents"
              stroke={Colours.blue}
            />
          </LineChart>
        </div>

        {/* Pie Chart - Notification Engagement */}
        <div>
          <h3>Notification Engagement</h3>
          <PieChart width={300} height={300}>
            <Pie
              dataKey="value"
              isAnimationActive={true}
              data={notificationData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill={Colours.green}
              label
            />
            <Tooltip />
          </PieChart>
        </div>
      </ChartContainer>
    </PageContainer>
  );
};

export default Analytics;
