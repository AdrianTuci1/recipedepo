import React, { useState } from 'react';
import '../styles/hoverimage.scss';
import { useNavigate } from 'react-router-dom';

interface HoverImageProps {
    defaultSrc: string;
    hoverSrc: string;
    alt: string;
    action: 'navigate' | 'switch' | 'print' | 'share'; // Action types
    route?: string; // Optional route for navigation
    switchSrc?: string;
}

const HoverImage: React.FC<HoverImageProps> = ({ defaultSrc, hoverSrc, alt, action, switchSrc }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isSwitched, setIsSwitched] = useState(false);

    const navigate = useNavigate();

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleClick = () => {
        switch (action) {
            case 'navigate':
                    navigate(-1);
                break;
            case 'switch':
                if (switchSrc) {
                    setIsSwitched(!isSwitched);
                    }
                    break;
            case 'print':
                window.open('URL_TO_PRINT_PAGE', '_blank', 'width=600,height=400');
                break;
            case 'share':
                window.open('URL_TO_SHARE_PAGE', '_blank', 'width=600,height=400');
                break;
            default:
                break;
        }
    };

    return (
        <img
            src={isSwitched ? switchSrc : (isHovered ? hoverSrc : defaultSrc)}
            alt={alt}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            className="hover-image"
        />
    );
};

export default HoverImage;

