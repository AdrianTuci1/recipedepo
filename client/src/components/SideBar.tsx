import '../styles/sidebar.scss';
import Dropdown from '../functional/Modal';
import PriceGroup from './dropdowns/PriceGroup';
import CheckboxGroup from './dropdowns/CheckBoxGroup';
import { useState } from 'react';

interface SidebarProps {
  isOpen?: boolean; // Optional prop to control initial state
  onToggle?: () => void; // Optional callback for toggling the sidebar
}

const SideBar: React.FC<SidebarProps> = ({ isOpen = false, onToggle }) => {
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);

  const toggleSidebar = () => {
    setInternalIsOpen(!internalIsOpen);
    onToggle?.(); // Call the optional callback if provided
  };

  const options = [
    { value: 'Romaneasca', label: 'Romaneasca' },
    { value: 'Italiana', label: 'Italiana' },
    { value: 'Spaniola', label: 'Spaniola' },
    // ... add more options
  ];

  const dificultate = [
    { value: 'Usor', label: 'Usor'},
    { value: 'Mediu', label: 'Mediu'},
    { value: 'Greu', label: 'Greu'},
  ]

  const continut = [
    { value: 'Pui', label: 'Pui'},
    { value: 'Porc', label: 'Porc'},
    { value: 'Vita', label: 'Vita'},
    { value: 'Vegan', label: 'Vegan'},
  ]


  return (
    <div className="side-wrapper">
    <div className={`sidebar ${internalIsOpen ? 'open' : ''}`}>
      <div className="side-bar">
        <h2>FILTER</h2>
        <Dropdown label="Pret" children={<PriceGroup />}/>
        <Dropdown label="Bucatarie">
            <CheckboxGroup options={options}/>
        </Dropdown>
        <Dropdown label="Dificultate">
            <CheckboxGroup options={dificultate}/>
        </Dropdown>
        <Dropdown label="Continut">
            <CheckboxGroup options={continut}/>
        </Dropdown>
        <Dropdown label="Timp de preparare">
          <p>Timp de preparare</p>
        </Dropdown>
    </div>
    <button className="toggler" onClick={toggleSidebar}>{internalIsOpen ? 'Close' : 'Open'} Sidebar</button>
    </div>
    </div>
  );
};

export default SideBar;
