import React, { useState } from "react";
import styled from "styled-components";
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
  width: 100%;
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
  padding: 10px;
  border-radius: 5px;
  border: 1px solid ${Colours.lightgray};
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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const ModalButton = styled.button`
  background: ${(props) => (props.danger ? Colours.red : Colours.blue)};
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  &:hover {
    background: ${(props) =>
      props.danger ? Colours.darkred : Colours.darkblue};
  }
`;

const Constituents = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [village, setVillage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedConstituent, setSelectedConstituent] = useState(null);
  const [updatedLocation, setUpdatedLocation] = useState("");

  const constituents = [
    {
      id: 1,
      name: "Jean Claude",
      age: 23,
      contact: "0781234567",
      village: "Rebero",
    },
    {
      id: 2,
      name: "Aline Mukamana",
      age: 22,
      contact: "0782345678",
      village: "Ubumwe",
    },
    {
      id: 3,
      name: "Eric Ndayisenga",
      age: 19,
      contact: "0783456789",
      village: "Rutsiro I",
    },
    {
      id: 4,
      name: "Mugisha Thierry",
      age: 22,
      contact: "0784567890",
      village: "Rutsiro II",
    },
    {
      id: 5,
      name: "Ariane Uwase",
      age: 22,
      contact: "0785678901",
      village: "Rebero",
    },
    {
      id: 6,
      name: "Didier Nsengimana",
      age: 27,
      contact: "0786789012",
      village: "Ubumwe",
    },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredConstituents = constituents.filter((constituent) =>
    constituent.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openModal = (constituent) => {
    setSelectedConstituent(constituent);
    setUpdatedLocation(constituent.village);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedConstituent(null);
  };

  const openDeletePopup = (constituent) => {
    setSelectedConstituent(constituent);
    setIsDeletePopupOpen(true);
  };

  const closeDeletePopup = () => {
    setIsDeletePopupOpen(false);
    setSelectedConstituent(null);
  };

  const handleUpdateLocation = () => {
    console.log(`Updated location: ${updatedLocation}`);
    closeModal();
  };

  const handleDeleteConstituent = () => {
    console.log(`Deleted constituent: ${selectedConstituent.name}`);
    closeDeletePopup();
  };

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
        <FilterSelect
          value={village}
          onChange={(e) => setVillage(e.target.value)}
        >
          <option value="">Select Village</option>
          <option value="Rebero">Rebero</option>
          <option value="Ubumwe">Ubumwe</option>
          <option value="Rutsiro I">Rutsiro I</option>
          <option value="Rutsiro II">Rutsiro II</option>
        </FilterSelect>
      </SearchFilterContainer>

      <ConstituentList>
        {filteredConstituents.map((constituent) => (
          <ConstituentCard key={constituent.id}>
            <CardTitle>{constituent.name}</CardTitle>
            <CardText>Age: {constituent.age}</CardText>
            <CardText>Contact: {constituent.contact}</CardText>
            <CardText>Village: {constituent.village}</CardText>

            <ButtonContainer>
              <ActionButton onClick={() => openModal(constituent)}>
                Edit
              </ActionButton>
              <ActionButton onClick={() => openDeletePopup(constituent)}>
                Delete
              </ActionButton>
            </ButtonContainer>
          </ConstituentCard>
        ))}
      </ConstituentList>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Edit Location</h3>
            <p>{selectedConstituent.name}</p>
            <FilterSelect
              value={updatedLocation}
              onChange={(e) => setUpdatedLocation(e.target.value)}
            >
              <option value="Rebero">Rebero</option>
              <option value="Ubumwe">Ubumwe</option>
              <option value="Rutsiro I">Rutsiro I</option>
              <option value="Rutsiro II">Rutsiro II</option>
            </FilterSelect>
            <ModalButton onClick={handleUpdateLocation}>Update</ModalButton>
            <ModalButton danger onClick={closeModal}>
              Cancel
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}

      {isDeletePopupOpen && (
        <ModalOverlay>
          <ModalContent>
            <h3>Are you sure you want to delete?</h3>
            <p>{selectedConstituent.name}</p>
            <ModalButton onClick={handleDeleteConstituent}>Yes</ModalButton>
            <ModalButton danger onClick={closeDeletePopup}>
              No
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </PageContainer>
  );
};

export default Constituents;
