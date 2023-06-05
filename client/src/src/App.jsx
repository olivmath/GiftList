import MerkleTreeWindow from './components/MerkleTreeWindow';
import TutorialMerkleTree from './components/TutorialMerkleTree';
import { ThemeProvider } from 'styled-components';
import theme from 'react95/dist/themes/raspberry';
import React, { useState } from 'react';
import { GlobalStyles } from './styles';

export default function () {
    const [showTutorial, setShowTutorial] = useState(true);

    const closeTutorial = () => {
        setShowTutorial(false);
    };

    return (
        <>
            <GlobalStyles />
            <ThemeProvider theme={theme}>
                {showTutorial && <TutorialMerkleTree onClose={closeTutorial} />}
                {!showTutorial && <MerkleTreeWindow />}
            </ThemeProvider>
        </>
    );
}
