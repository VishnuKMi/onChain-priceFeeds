export const CONTRACT_ADDRESS = '0x6B57c86995204b6Ab4E5D4d729429643F74c1A1F'
export const CONTRACT_ABI = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'symbol',
        type: 'string'
      }
    ],
    name: 'getLatestPrice',
    outputs: [
      {
        internalType: 'int256',
        name: '',
        type: 'int256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]
