import React from 'react';
import { Button, MenuList, MenuListItem } from 'react95';

export default function ({ proof, onValidate }) {
    return (
        <>
            <MenuList>
                {proof.map((item, index) => (
                    <MenuListItem key={index}>
                        Left: {item.left.toString()}, Data: {item.data.substring(0, 6)}...{item.data.substring(item.data.length - 4)}
                    </MenuListItem>
                ))}
            </MenuList>
            <Button onClick={onValidate}>VALIDATE PROOF</Button>
        </>
    );
}

