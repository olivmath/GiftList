import React, { useState, useEffect } from 'react';
import { Window, WindowContent, WindowHeader, Button } from 'react95';

export default function ({ message, top, left, onClose }) {
    const [position, setPosition] = useState({
        x: left ? parseFloat(left) : 0,
        y: top ? parseFloat(top) : 0,
        isDragging: false,
        startX: 0,
        startY: 0,
    });

    const handleMouseDown = (e) => {
        e.preventDefault();
        setPosition((prevState) => ({
            ...prevState,
            isDragging: true,
            startX: e.clientX - position.x,
            startY: e.clientY - position.y,
        }));
    };

    const handleMouseMove = (e) => {
        e.preventDefault();
        if (position.isDragging) {
            setPosition((prevState) => ({
                ...prevState,
                x: e.clientX - position.startX,
                y: e.clientY - position.startY,
            }));
        }
    };

    const handleMouseUp = () => {
        setPosition((prevState) => ({
            ...prevState,
            isDragging: false,
        }));
    };

    useEffect(() => {
        if (position.isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        } else {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        }
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [position.isDragging]);

    const windowStyle = {
        position: 'fixed',
        top: `${position.y}px`,
        left: `${position.x}px`,
    };

    const headerStyle = {
        cursor: position.isDragging ? 'grabbing' : 'grab',
    };

    return (
        <Window className='popup-window' style={windowStyle}>
            <WindowHeader
                className='window-title'
                onMouseDown={handleMouseDown}
                style={headerStyle}
            >
                <span>Server Response</span>
                <Button onClick={onClose}>
                    <span className='close-icon' />
                </Button>
            </WindowHeader>
            <WindowContent>
                <p>{message}</p>
            </WindowContent>
        </Window>
    );
};

