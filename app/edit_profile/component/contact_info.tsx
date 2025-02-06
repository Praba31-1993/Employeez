import React, { useState } from 'react';
import Personal_address from './personal_address';
import Emergency_contact from './emergency_contact';
import Work_address from './work_address';

function Contact_info() {
  const [selectedOption, setSelectedOption] = useState("1"); // Default: Personal Address

  // Function to render the selected component
  const renderComponent = () => {
    switch (selectedOption) {
      case "1":
        return <Personal_address selectedOption={selectedOption} setSelectedOption={setSelectedOption} />;
      case "2":
        return <Emergency_contact selectedOption={selectedOption} setSelectedOption={setSelectedOption} />;
      case "3":
        return <Work_address selectedOption={selectedOption} setSelectedOption={setSelectedOption} />;
      default:
        return <Personal_address selectedOption={selectedOption} setSelectedOption={setSelectedOption} />;
    }
  };

  return <>{renderComponent()}</>;
}

export default Contact_info;
