import { useState } from "react";

interface CheckboxOption {
    value: string; // Assuming string values for options
    label?: string; // Optional label for the checkbox
  }
  
  interface CheckboxGroupProps {
    options: CheckboxOption[];
  }
  
function CheckboxGroup ({ options }: CheckboxGroupProps) {
    const [checkedItems, setCheckedItems] = useState<string[]>([]); // Array to store checked items
  
    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { checked, value } = event.target;
      if (checked) {
        setCheckedItems([...checkedItems, value]); // Add checked item to state
      } else {
        setCheckedItems(checkedItems.filter((item) => item !== value)); // Remove unchecked item
      }
    };
  
    return (
      <div className='categorie'>
        <h4>Categorie:</h4>
        {options.map((option) => (
          <label key={option.value} className='checkbox'>
            <input
              className='box_01'
              type="checkbox"
              value={option.value}
              checked={checkedItems.includes(option.value)} // Check if item is in state
              onChange={handleCheckboxChange}
            />
            <div className="box_02">
            {option.label || option.value} {/* Display label or value */}
            </div>
          </label>
        ))}
        </div>
    );
  }

  export default CheckboxGroup;