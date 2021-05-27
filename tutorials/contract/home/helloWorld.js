const address = "0x9782bbFa94E6901269ddBaa55069340d66c66912";
const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "initMessage",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "newMessage",
        "type": "string"
      }
    ],
    "name": "update",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "message",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

module.exports = { address, abi }