const ethers = require('ethers')

function concat(x, y) {
    const data = x + y
    const dataBytes = ethers.utils.toUtf8Bytes(data);
    return ethers.utils.keccak256(dataBytes)
}


class Node {
    constructor(left, data) {
        this.left = left
        this.data = data
    }
}

function verifyProof(proof, starterNode, root) {
    const proposalRoot = proof.reduce((nodeL, nodeR) => {
        if (nodeL.data == undefined) {
            if (nodeR.left) {
                const data = concat(nodeR.data, starterNode)
                return new Node(false, data)
            } else {
                const data = concat(starterNode, nodeR.data)
                return new Node(false, data)
            }
        } else {
            if (nodeR.left) {
                const data = concat(nodeR.data, nodeL.data)
                return new Node(false, data)
            } else {
                const data = concat(nodeL.data, nodeR.data)
                return new Node(false, data)
            }

        }
    }, [starterNode])

    return proposalRoot.data == root
}


module.exports = verifyProof