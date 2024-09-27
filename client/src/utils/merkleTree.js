import { ethers } from "ethers"

function hash(data) {
    const dataBytes = ethers.utils.toUtf8Bytes(data);
    return ethers.utils.keccak256(dataBytes)
}

class Node {
    constructor(left, data) {
        this.left = left
        this.data = data
    }
}

class MerkleTree {
    constructor(leaves) {
        this.leaves = leaves
        this.concatFunction = (x, y) => {
            const data = x + y
            const dataBytes = ethers.utils.toUtf8Bytes(data);
            return ethers.utils.keccak256(dataBytes)
        }
    }

    chunk(chunkCut, arr) {
        let R = []
        for (var i = 0; i < arr.length; i += chunkCut)
            R.push(arr.slice(i, i + chunkCut))
        return R
    }


    makeRoot(leaves) {
        if (leaves.length == 1) {
            return leaves[0];
        }
        return this.makeRoot(this.upLayer(leaves))
    }

    getRoot() {
        if (this.root) {
            return this.root
        } else {
            this.root = this.makeRoot(this.leaves)
            return this.getRoot()
        }
    }

    makeProof(leaves, proof, indexOfLeafTarget) {
        if (leaves.length === 1) {
            return proof
        }

        if (indexOfLeafTarget % 2 == 0) {
            if (indexOfLeafTarget + 1 < leaves.length) {
                const leaf = leaves[indexOfLeafTarget + 1]
                const node = new Node(false, leaf)
                proof.push(node)
            }
        } else {
            const leaf = leaves[indexOfLeafTarget - 1]
            const node = new Node(true, leaf)
            proof.push(node)
        }
        return this.makeProof(this.upLayer(leaves), proof, Math.floor(indexOfLeafTarget / 2))
    }

    getProof(indexOfLeafTarget) {
        if (indexOfLeafTarget > this.leaves.length - 1) {
            throw new Error(`index must be less than ${this.leaves.length}`)
        }
        return this.makeProof(this.leaves, [], indexOfLeafTarget);
    }


    upLayer(leaves) {
        let newLayer = []
        this.chunk(2, leaves)
            .forEach(item => {
                if (item.length == 1) {
                    newLayer.push(item[0])
                } else {
                    const data = this.concatFunction(item[0], item[1])
                    newLayer.push(data)
                }
            })
        return newLayer
    }

    verifyProof(proof, starterNode, root) {
        const proposalRoot = proof.reduce((nodeL, nodeR) => {
            if (nodeL.data == undefined) {
                if (nodeR.left) {
                    const data = this.concatFunction(nodeR.data, starterNode.data)
                    return new Node(false, data)
                } else {
                    const data = this.concatFunction(starterNode.data, nodeR.data)
                    return new Node(false, data)
                }
            } else {
                if (nodeR.left) {
                    const data = this.concatFunction(nodeR.data, nodeL.data)
                    return new Node(false, data)
                } else {
                    const data = this.concatFunction(nodeL.data, nodeR.data)
                    return new Node(false, data)
                }

            }
        }, [starterNode])
        return proposalRoot.data == root
    }
}


export {
    MerkleTree, Node, hash
}
