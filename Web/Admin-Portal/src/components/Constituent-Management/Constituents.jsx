import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
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

const SearchFilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SearchInput = styled.input`
  padding: 8px;
  width: 300px;
  border-radius: 5px;
  border: 1px solid ${Colours.lightgray};
`;

const FilterSelect = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid ${Colours.lightgray};
  margin: 0 10px;
`;

const ConstituentList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

const ConstituentCard = styled.div`
  background: ${Colours.lightgray};
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  position: relative;
`;

const CardTitle = styled.h3`
  font-size: 1.2rem;
  color: ${Colours.darkgray};
`;

const CardText = styled.p`
  font-size: 1rem;
  color: ${Colours.gray};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
`;

const ActionButton = styled.button`
  padding: 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: ${Colours.blue};
  color: #fff;
  &:hover {
    background-color: ${Colours.darkblue};
  }
`;

const AddButton = styled(Link)`
  background: ${Colours.green};
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  font-weight: bold;
  &:hover {
    background: ${Colours.darkgreen};
  }
`;

const Constituents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [district, setDistrict] = useState("");
  const [sector, setSector] = useState("");
  const [cell, setCell] = useState("");
  const [village, setVillage] = useState("");

  // Example data for demonstration
  const constituents = [
    {
      id: 1,
      name: "John Doe",
      age: 32,
      contact: "123456789",
      village: "Rebero",
    },
    {
      id: 2,
      name: "Jane Smith",
      age: 28,
      contact: "987654321",
      village: "Rutsiro",
    },
    // More data...
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredConstituents = constituents.filter((constituent) =>
    constituent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageContainer>
      <Header>Constituent Management</Header>

      <SearchFilterContainer>
        <SearchInput
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <div>
          <FilterSelect
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">Select District</option>
            <option value="Gasabo">Gasabo</option>
            {/* More districts */}
          </FilterSelect>

          <FilterSelect
            value={sector}
            onChange={(e) => setSector(e.target.value)}
          >
            <option value="">Select Sector</option>
            <option value="Remera">Remera</option>
            {/* More sectors */}
          </FilterSelect>

          <FilterSelect value={cell} onChange={(e) => setCell(e.target.value)}>
            <option value="">Select Cell</option>
            <option value="Rukiri II">Rukiri II</option>
            {/* More cells */}
          </FilterSelect>

          <FilterSelect
            value={village}
            onChange={(e) => setVillage(e.target.value)}
          >
            <option value="">Select Village</option>
            <option value="Rebero">Rebero</option>
            {/* More villages */}
          </FilterSelect>
        </div>

        <AddButton to="/add-constituent">Add New Constituent</AddButton>
      </SearchFilterContainer>

      <ConstituentList>
        {filteredConstituents.map((constituent) => (
          <ConstituentCard key={constituent.id}>
            <CardTitle>{constituent.name}</CardTitle>
            <CardText>Age: {constituent.age}</CardText>
            <CardText>Contact: {constituent.contact}</CardText>
            <CardText>Village: {constituent.village}</CardText>

            <ButtonContainer>
              <ActionButton>View Details</ActionButton>
              <ActionButton>Send Notification</ActionButton>
            </ButtonContainer>
          </ConstituentCard>
        ))}
      </ConstituentList>
    </PageContainer>
  );
};

export default Constituents;
