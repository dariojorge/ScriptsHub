import { useState } from 'react';

const ToggleButtonComponent = () => {
    const [isOn, setIsOn] = useState(false);

    const toggle = () => {
        setIsOn(prev => !prev);
    };

    return (
        <button onClick={toggle}>
            {isOn ? 'ON' : 'OFF'}
        </button>
    );
};

export default ToggleButtonComponent;
