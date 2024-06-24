import { useState } from "react";

function PriceGroup () {
    const [value, setValue] = useState<number>(1); // Initial value
    
    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      setValue(Number(event.target.value));
    };
    
    const formatValue = (val: number) => {
        return '$'.repeat(Math.min(val, 4)); // Ensure max of 4 dollar signs
      };
        return(
            <>
            <h4>Pret:</h4>
            <input
            type="range"
            id="slider"
            value={value}
            onChange={handleChange}
            min="1"
            max="4"
            step="1" // Adjust step for desired precision
            style={{
              // Add custom styles here (e.g., width, track styles, thumb styles)
            }}
          />
          <span>Selected value: {formatValue(value)}</span>
          </>
        )
    }

    export default PriceGroup