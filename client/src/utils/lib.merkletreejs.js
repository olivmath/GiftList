import { ethers } from "ethers";
import { MerkleTree } from "./merkleTree";

const keccak = (data) => {
  const dataBytes = ethers.utils.toUtf8Bytes(data);
  return ethers.utils.keccak256(dataBytes);
};

class LibMerkleTreeJS {
  merkleTree;

  constructor(hashedLeaves) {
    this.merkleTree = new MerkleTree(hashedLeaves);
  }

  getRoot() {
    return this.merkleTree.getRoot();
  }

  getProof(index) {
    return this.merkleTree.getProof(index);
  }

  verify(leaf, proof, root) {
    let computedHash = keccak(leaf);

    for (const proofElement of proof) {
      if (proofElement.left) {
        computedHash = keccak(proofElement.data + computedHash);
      } else {
        computedHash = keccak(computedHash + proofElement.data);
      }
    }

    return computedHash === root;
  }
}

export default LibMerkleTreeJS;
