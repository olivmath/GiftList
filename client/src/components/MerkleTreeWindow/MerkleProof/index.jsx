import { Avatar, Button } from 'react95';
import Identicon from 'identicon.js';
import React from 'react';
import styled from 'styled-components';

const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin: 20px;
`;

const PeaceProof = ({ size, hash, left }) => {
    const blue = [10, 36, 106, 255];
    const red = [153, 0, 51, 255];
    if (hash) {
        const icon = new Identicon(hash, {
            background: [0, 0, 0, 0],
            foreground: left ? blue : red,
            format: 'svg',
            size: size,
        }).toString()
        const data = `data:image/svg+xml;base64,${icon}`
        return <Avatar square size={100}>
            <img src={data} style={{ width: size, height: size }} />
        </Avatar>
    } else {
        return <Avatar square size={100} />
    }
}

export default function ({ proof, onValidate }) {
    const fillers = new Array(12 - proof.length).fill({});
    const completeProof = [...proof, ...fillers];

    return (
        <>
            <Grid>
                {completeProof.map((item, index) => (
                    <PeaceProof key={index} hash={item.data} left={item.left} />
                ))}
            </Grid>
            <Button onClick={onValidate}>VALIDATE PROOF</Button>
        </>
    );
}
