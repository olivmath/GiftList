import React from 'react';
import { Window, WindowContent, WindowHeader, Button } from 'react95';
import style from './style';

export default function ({ onClose }) {
    return (
        <style.Wrapper>
            <Window className='window'>
                <WindowHeader className='window-title'>
                    <span>Tutorial.exe</span>
                    <Button onClick={onClose}>
                        <span className='close-icon' />
                    </Button>
                </WindowHeader>
                <WindowContent>
                    <h1>How this project works? 🌳</h1>
                    <p>
                        In this project, the client component is responsible for maintaining the list of names,
                        while the server component stores only the Merkle Root. This approach allows for efficient
                        storage and verification of names in the VIP list.
                    </p>
                    <h1>Client Component 🖥️</h1>
                    <ul>
                        <li>The client provides a user interface for selecting a name from the VIP list.</li>
                        <li>It generates a Merkle proof for the selected name using the Merkle Tree structure.</li>
                        <li>The generated proof consists of a list of hash values that authenticate the path from the selected name to the Merkle Root.</li>
                    </ul>
                    <h1>Server Component 💻</h1>
                    <p>
                        <ul>
                            <li>The server stores the 32-byte Merkle Root, which represents the integrity of the VIP list.</li>
                            <li>It receives the name and proof from the client.</li>
                            <li>The server verifies the received proof by comparing it with the stored Merkle Root.</li>
                            <li><div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '300px' }}><span>If the proof is valid:</span><span>"You are VIP ✅"</span></div></li>
                            <li><div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '300px' }}><span>If not:</span><span>"You are not VIP 🚨"</span></div></li>
                        </ul>
                    </p>
                </WindowContent>
            </Window>
        </style.Wrapper>
    );
}
