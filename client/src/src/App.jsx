import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from 'react95/dist/themes/raspberry';
import MerkleTreeWindow from './components/MerkleTreeWindow';
import { GlobalStyles } from './styles';

export default function () {
    return (
        <>
            <GlobalStyles />
            <ThemeProvider theme={theme}>
                <MerkleTreeWindow />
            </ThemeProvider>
        </>
    );
}
