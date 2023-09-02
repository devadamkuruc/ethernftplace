// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract EtherNFTPlace is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    Counters.Counter private _collectionIds;

    uint256 listingPrice = 0.0015 ether;

    address payable owner;

    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(address => Collection[]) private collectionsByOwner;
    mapping(uint256 => uint256) private collectionIdToIndex;

    struct Collection {
        uint256 collectionId;
        address creator;
        uint256[] nfts;
    }

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        uint256 collectionId;
    }

    struct Activity {
        string activityType;
        uint256 timestamp;
        uint256 tokenId;
        address user;
    }

    Activity[] public latestActivity;

    event MarketItemCreated (
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold,
        uint256 collectionId
    );

    event CollectionCreated (
        uint256 indexed collectionId,
        address creator
    );

    event NFTAddedToCollection (
        uint256 indexed collectionId,
        uint256 indexed tokenId
    );

    modifier onlyOwner() {
        require(owner == msg.sender, "Only marketplace owner can update the listing price");
        _;
    }

    constructor() ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender);
    }

    function recordActivity(string memory _activityType, uint256 _tokenId) public {
        latestActivity.push(Activity(_activityType, block.timestamp, _tokenId, msg.sender));
    }

    function getLatestActivity() public view returns (Activity[] memory) {
        return latestActivity;
    }

    function updateListingPrice(uint _listingPrice) public payable onlyOwner {
        listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createToken(string memory tokenURI, uint256 price, uint256 collectionId) public payable returns (uint) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

         if (collectionId != 0) {
        addNFTToCollection(collectionId, newTokenId);
    }

        return newTokenId;
    }

    function createMarketItem(uint256 tokenId, uint256 price) private {
        require(price > 0, "Price must be at least 1");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        idToMarketItem[tokenId] =  MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false,
            0
        );

        _transfer(msg.sender, address(this), tokenId);

        emit MarketItemCreated(tokenId, msg.sender, address(this), price, false);
    }

    function createCollection() public {
        _collectionIds.increment();
        uint256 newCollectionId = _collectionIds.current();

        collectionsByOwner[msg.sender].push(Collection(newCollectionId, msg.sender, new uint256[](0)));
        collectionIdToIndex[newCollectionId] = collectionsByOwner[msg.sender].length - 1;

        emit CollectionCreated(newCollectionId, msg.sender);
    }


    function addNFTToCollection(uint256 collectionId, uint256 tokenId) public {
        require(_exists(tokenId), "Token does not exist");
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this token");

        uint256 collectionIndex = collectionIdToIndex[collectionId];
        require(collectionsByOwner[msg.sender][collectionIndex].collectionId == collectionId, "Collection does not exist");

        collectionsByOwner[msg.sender][collectionIndex].nfts.push(tokenId);

        emit NFTAddedToCollection(collectionId, tokenId);
    }


    function fetchCollectionsByOwner(address owner, uint256 pageNumber, uint256 collectionsPerPage) public view returns (uint256[] memory) {
    Collection[] memory collections = collectionsByOwner[owner];

    uint256 startIndex = (pageNumber - 1) * collectionsPerPage;
    uint256 endIndex = startIndex + collectionsPerPage;

    if (endIndex > collections.length) {
        endIndex = collections.length;
    }

    uint256[] memory collectionIds = new uint256[](endIndex - startIndex);

    for (uint256 i = startIndex; i < endIndex; i++) {
        collectionIds[i - startIndex] = collections[i].collectionId;
    }

    return collectionIds;
}


    function fetchNFTsByCollection(uint256 collectionId) public view returns (MarketItem[] memory) {
        require(collectionId <= _collectionIds.current(), "Invalid collection ID");

        uint256[] memory nftIds = collectionsByOwner[msg.sender][collectionIdToIndex[collectionId]].nfts;
        uint256 itemCount = 0;

        // Count the number of NFTs owned by the user in the specified collection
        for (uint256 i = 0; i < nftIds.length; i++) {
            if (idToMarketItem[nftIds[i]].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        uint256 currentIndex = 0;

        // Populate the items array with NFTs owned by the user in the specified collection
        for (uint256 i = 0; i < nftIds.length; i++) {
            if (idToMarketItem[nftIds[i]].owner == msg.sender) {
                MarketItem storage currentItem = idToMarketItem[nftIds[i]];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }

        return items;
    }



    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(idToMarketItem[tokenId].owner == msg.sender, "Only item owner can perform this operation");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        
        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    function createMarketSale(uint256 tokenId) public payable {
        uint price = idToMarketItem[tokenId].price;

        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        idToMarketItem[tokenId].owner = payable(msg.sender);
        idToMarketItem[tokenId].sold = true;
        idToMarketItem[tokenId].seller = payable(address(0));

        _itemsSold.increment();

        _transfer(address(this), msg.sender, tokenId);

        payable(owner).transfer(listingPrice);
        payable(idToMarketItem[tokenId].seller).transfer(msg.value);
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _tokenIds.current();
        uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);

        for(uint i = 0; i < itemCount; i++) {
            if(idToMarketItem[i+1].owner == address(this)) {
                uint currentId = i + 1;

                MarketItem storage currentItem = idToMarketItem[currentId];

                items[currentIndex] = currentItem;

                currentIndex += 1;
            }
        }

        return items;
    }

    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i< totalItemCount; i++) {
            if(idToMarketItem[i+1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);

        for(uint i = 0; i < totalItemCount; i++) {
            if(idToMarketItem[i+1].owner == msg.sender) {
                uint currentId = i + 1;

                MarketItem storage currentItem = idToMarketItem[currentId];

                items[currentIndex] = currentItem;

                currentIndex += 1;
            }
        }

        return items;
    }

    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for(uint i = 0; i< totalItemCount; i++) {
            if(idToMarketItem[i+1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);

        for(uint i = 0; i < totalItemCount; i++) {
            if(idToMarketItem[i+1].seller == msg.sender) {
                uint currentId = i + 1;

                MarketItem storage currentItem = idToMarketItem[currentId];

                items[currentIndex] = currentItem;

                currentIndex += 1;
            }
        }

        return items;
    }
}