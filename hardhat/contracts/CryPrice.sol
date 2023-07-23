// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract CryPrice {
    struct PriceFeed {
        address aggregatorAddr;
        int decimals;
    }

    mapping(string=>PriceFeed) private priceFeeds;

    constructor() {
        priceFeeds["BTC/USD"] = PriceFeed(0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43, 8);
        priceFeeds["ETH/USD"] = PriceFeed(0x694AA1769357215DE4FAC081bf1f309aDC325306, 8);
        priceFeeds["BTC/ETH"] = PriceFeed(0x5fb1616F78dA7aFC9FF79e0371741a747D2a7F22, 18);
        priceFeeds["LINK/USD"] = PriceFeed(0xc59E3633BAAC79493d908e63626716e204A45EdF, 8);
    }

    function getLatestPrice(string memory symbol) public view returns (int) {
        PriceFeed memory feed = priceFeeds[symbol];
        require(feed.aggregatorAddr != address(0), "Invalid symbol");

        AggregatorV3Interface dataFeed = AggregatorV3Interface(feed.aggregatorAddr);
        ( , int price, , , ) = dataFeed.latestRoundData();
        return price;
    }
}