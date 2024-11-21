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

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 1rem;
  font-weight: bold;
  color: ${Colours.darkgray};
`;

const Select = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${Colours.lightgray};
  margin-left: 10px;
  font-size: 1rem;
`;

const StatContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 15px;
`;

const StatCard = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const StatTitle = styled.h3`
  font-size: 1.2rem;
  color: ${Colours.darkgray};
`;

const StatValue = styled.p`
  font-size: 1.5rem;
  color: ${Colours.blue};
  font-weight: bold;
`;

const ChartContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
  gap: 20px;
`;

const ChartWrapper = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ChartTitle = styled.h3`
  font-size: 1.2rem;
  color: ${Colours.darkgray};
  margin-bottom: 10px;
  text-align: center;
`;

const Analytics = () => {
  const [dateRange, setDateRange] = useState("Monthly");

  // Mock data for charts
  const constituentData = {
    Monthly: [
      { name: "October", constituents: 3 },
      { name: "November", constituents: 11 },
    ],
    Weekly: [
      { name: "Week 1", constituents: 50 },
      { name: "Week 2", constituents: 60 },
      { name: "Week 3", constituents: 45 },
      { name: "Week 4", constituents: 70 },
    ],
    Daily: [
      { name: "Day 1", constituents: 10 },
      { name: "Day 2", constituents: 15 },
      { name: "Day 3", constituents: 12 },
      { name: "Day 4", constituents: 18 },
    ],
  };

  const notificationData = [
    { name: "Read", value: 7 },
    { name: "Unread", value: 3 },
  ];

  const handleDateRangeChange = (event) => {
    setDateRange(event.target.value);
  };

  return (
    <PageContainer>
      <Header>Analytics Dashboard</Header>

      {/* Filter */}
      <FilterContainer>
        <Label htmlFor="date-range">Date Range:</Label>
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
          <StatValue>14</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Notifications Sent</StatTitle>
          <StatValue>10</StatValue>
        </StatCard>
        <StatCard>
          <StatTitle>Engagement Rate</StatTitle>
          <StatValue>85%</StatValue>
        </StatCard>
      </StatContainer>

      {/* Charts */}
      <ChartContainer>
        <ChartWrapper>
          <ChartTitle>Constituent Growth</ChartTitle>
          <LineChart width={400} height={300} data={constituentData[dateRange]}>
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
        </ChartWrapper>

        <ChartWrapper>
          <ChartTitle>Notification Engagement</ChartTitle>
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
        </ChartWrapper>
      </ChartContainer>
    </PageContainer>
  );
};

export default Analytics;
