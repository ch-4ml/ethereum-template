const address = '0xd389CeDe2AA9e20057c75a3F5a3dAfEd64357C9a';
const abi = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'initialSupply',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'balanceOf',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256'
      }
    ],
    name: 'transfer',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
];

module.exports = { address, abi };
