const address = '0x4156F5c7D9a657cDe486f2C656e1068674220eaf';
const abi = [
  {
    inputs: [
      {
        internalType: 'string',
        name: 'initMessage',
        type: 'string'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'newMessage',
        type: 'string'
      }
    ],
    name: 'update',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'message',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
];

module.exports = { address, abi };
