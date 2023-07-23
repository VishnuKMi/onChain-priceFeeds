import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './constants'

const Page = () => {
  const [btcPrice, setBtcPrice] = useState('')
  const [ethPrice, setEthPrice] = useState('')
  const [linkPrice, setLinkPrice] = useState('')
  const [btcEthPrice, setBtcEthPrice] = useState('')

  useEffect(() => {
    async function fetchPrices () {
      try {
        const provider = new ethers.providers.InfuraProvider(
          'sepolia',
          process.env.REACT_APP_INFURA_KEY
        )

        const contract = new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          provider
        )

        const btcPrice = await contract.getLatestPrice('BTC/USD')
        const adjustedBtcPrice = ethers.utils.formatUnits(btcPrice, 8)

        const ethPrice = await contract.getLatestPrice('ETH/USD')
        const adjustedEthPrice = ethers.utils.formatUnits(ethPrice, 8)

        const linkPrice = await contract.getLatestPrice('LINK/USD')
        const adjustedLinkPrice = ethers.utils.formatUnits(linkPrice, 8)

        const btcEthPrice = await contract.getLatestPrice('BTC/ETH')
        const adjustedBtcEthPrice = ethers.utils.formatUnits(btcEthPrice, 18)

        setBtcPrice(adjustedBtcPrice)
        setEthPrice(adjustedEthPrice)
        setLinkPrice(adjustedLinkPrice)
        setBtcEthPrice(adjustedBtcEthPrice)
      } catch (error) {
        console.error('Error fetching prices:', error)
      }
    }

    fetchPrices()
  }, [])

  return (
    <div className='h-screen bg-yellow-300 flex justify-center items-center'>
      <div className='flex justify-between gap-8'>
        <div className='flex flex-col items-center pb-10 dark:bg-gray-800 dark:border-gray-700 px-12 rounded-lg'>
          <img
            className='w-18 h-18 mb-3 rounded-full'
            src='bitcoin-96.png'
            alt='Btc image'
          />
          <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
            BTC/USD
          </h5>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            {Number(btcPrice).toFixed(2)} USD
          </span>
        </div>
        <div className='flex flex-col items-center pb-10 dark:bg-gray-800 dark:border-gray-700 px-12  rounded-lg'>
          <img
            className='w-18 h-18 mb-3 rounded-full'
            src='ethereum-96.png'
            alt='Eth image'
          />
          <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
            ETH/USD
          </h5>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            {Number(ethPrice).toFixed(2)} USD
          </span>
        </div>
        <div className='flex flex-col items-center pb-10 dark:bg-gray-800 dark:border-gray-700 px-12  rounded-lg'>
          <img
            className='w-16 py-4 h-24 mb-3 rounded-full'
            src='chainlink.png'
            alt='Link image'
          />
          <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
            LINK/USD
          </h5>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            {Number(linkPrice).toFixed(2)} USD
          </span>
        </div>
        <div className='flex flex-col items-center pb-10 pt-4 dark:bg-gray-800 dark:border-gray-700 px-12  rounded-lg'>
          <img
            className='w-[70px] object-cover h-[70px] mb-3 rounded-full'
            src='btcEth.png'
            alt='BtcEth image'
          />
          <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
            BTC/ETH
          </h5>
          <span className='text-sm text-gray-500 dark:text-gray-400'>
            {Number(btcEthPrice).toFixed(2)} USD
          </span>
        </div>
      </div>
    </div>
  )
}

export default Page
