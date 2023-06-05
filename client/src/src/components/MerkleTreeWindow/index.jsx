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


    const handleSelectChange = (option) => {
        setName(option.value);
    };

    const generateProof = async () => {
        const proofData = MTREE.getProof(HASH_VIP_LIST.indexOf(hash(name)));
        setProof(proofData);
    };

    const validateProof = async () => {
        let response;
        try {
            await server.post("/gift", {
                leaf: hash(name),
                proof
            }).then(r => response = r.data);
        } catch (error) {
            response = error
        }
        console.log(response)
    };


    return (
        <styles.Wrapper>
            <Window className='window'>
                <WindowHeader className='window-title'>
                    <span>MerkleTree.exe</span>
                    <Button>
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
        </styles.Wrapper>
    );
}
