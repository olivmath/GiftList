import React, { useState } from 'react';
import styles from './styles';
import {
    Button,
    Window,
    WindowContent,
    WindowHeader
} from 'react95';
import { MerkleTree, hash } from "../../utils/merkleTree";
import { VIP_LIST, HASH_VIP_LIST } from "../../utils/vipList"

import server from "../../utils/server"
import VipList from "./VipList"
import MerkleProof from "./MerkleProof"

const MTREE = new MerkleTree(HASH_VIP_LIST)

export default function () {
    const [name, setName] = useState("");
    const [proof, setProof] = useState();
    const [responseWindows, setResponseWindows] = useState([]);

    const handleSelectChange = (option) => {
        setName(option.value);
    };

    const generateProof = async () => {
        const proof = MTREE.getProof(HASH_VIP_LIST.indexOf(hash(name)));
        setProof(proof);
    };

    const validateProof = async () => {
        let response;
        try {
            await server.post("/vip", {
                leaf: hash(name),
                proof
            }).then(r => response = r.data);
        } catch (error) {
            console.log(error)
            if (error.response) {
                response = error.response.data.message;
            }
        }
        setResponseWindows(prevWindows => [...prevWindows, { message: response, top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }]);
    };

    const closeWindow = (index) => {
        setResponseWindows(prevWindows => prevWindows.filter((_, i) => i !== index));
    };

    return (
        <styles.Wrapper>
            <Window className='window'>
                <WindowHeader className='window-title'>
                    <span>MerkleTree.exe</span>
                    <Button onClick={() => setResponseWindows([])}>
                        <span className='close-icon' />
                    </Button>
                </WindowHeader>
                <WindowContent>
                    <VipList vipList={VIP_LIST} onChange={handleSelectChange} />
                    <Button onClick={generateProof} disabled={name.trim() === ""}>
                        GENERATE MERKLE PROOF
                    </Button>
                    {proof && (
                        <MerkleProof proof={proof} onValidate={validateProof} />
                    )}
                </WindowContent>
            </Window>
            {responseWindows.map((window, index) => (
                <Window key={index} className='popup-window' style={{ position: 'fixed', top: window.top, left: window.left }}>
                    <WindowHeader className='window-title'>
                        <span>Server Response</span>
                        <Button onClick={() => closeWindow(index)}>
                            <span className='close-icon' />
                        </Button>
                    </WindowHeader>
                    <WindowContent>
                        <p>{window.message}</p>
                    </WindowContent>
                </Window>
            ))}
        </styles.Wrapper>
    );
}
