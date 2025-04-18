// src/index.ts
// A simple TypeScript example: Blockchain basics
var Block = /** @class */ (function () {
    function Block(index, timestamp, data, previousHash) {
        if (previousHash === void 0) { previousHash = ''; }
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }
    Block.prototype.calculateHash = function () {
        return "".concat(this.index).concat(this.timestamp).concat(JSON.stringify(this.data)).concat(this.previousHash);
    };
    return Block;
}());
var Blockchain = /** @class */ (function () {
    function Blockchain() {
        this.chain = [this.createGenesisBlock()];
    }
    Blockchain.prototype.createGenesisBlock = function () {
        return new Block(0, new Date().toISOString(), "Genesis Block", "0");
    };
    Blockchain.prototype.getLatestBlock = function () {
        return this.chain[this.chain.length - 1];
    };
    Blockchain.prototype.addBlock = function (newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    };
    Blockchain.prototype.isChainValid = function () {
        for (var i = 1; i < this.chain.length; i++) {
            var currentBlock = this.chain[i];
            var previousBlock = this.chain[i - 1];
            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    };
    return Blockchain;
}());
// Example usage
var myBlockchain = new Blockchain();
myBlockchain.addBlock(new Block(1, new Date().toISOString(), { amount: 100 }));
myBlockchain.addBlock(new Block(2, new Date().toISOString(), { amount: 50 }));
console.log(JSON.stringify(myBlockchain, null, 2));
console.log("Is blockchain valid?", myBlockchain.isChainValid());
