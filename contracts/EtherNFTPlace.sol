// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

import "hardhat/console.sol";

contract EtherNFTPlace is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _collectionIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.025 ether;

    address payable owner;

    mapping(uint256 => Collection) private idToCollection;
    mapping(uint256 => NFT) private idToNFT;
    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(uint256 => uint256[]) private collectionToNFTs;
    mapping(uint256 => Offer[]) private tokenIdToOffers;
    mapping(address => Offer[]) private addressToOffers;

    struct Collection {
        uint256 collectionId;
        address owner;
        string collectionURI;
    }

    struct Offer {
        address bidder;
        uint256 amount;
        uint256 expirationTimestamp;
    }

    struct NFT {
        uint256 tokenId;
        address owner;
        uint256 collectionId;
        uint256 price;
    }

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        uint256 floorPrice;
        bool sold;
    }

    event MarketItemCreated (
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        uint256 floorPrice,
        bool sold
    );

    event CollectionCreated (
        uint256 indexed collectionId,
        address owner,  
        string collectionURI
    );

    event CollectionMetadataUpdated (
        uint256 indexed collectionId,
        address owner,
        string collectionURI
    );

    event NFTCreated (
        uint indexed tokenId,
        address owner,
        uint256 collectionId,
        uint256 price
    );

    event NFTsCollectionUpdated (
      uint256[] nftIds,
      address owner,
      uint256 collectionId  
    );

    event OfferCreated (
        uint256 indexed tokenId,
        address indexed bidder,
        uint256 amount,
        uint256 expirationTimestamp
    );

    event OfferRemoved (
        uint256 indexed tokenId,
        address indexed bidder
    );

    constructor() ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender);
    }

    function updateListingPrice(uint _listingPrice) public payable {
        require(owner == msg.sender, "Only marketplace owner can update the listing price");

        listingPrice = _listingPrice;
    }

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    function createCollection(string memory _collectionURI, uint256[] memory selectedNFTs) external {
        _collectionIds.increment();

        uint256 collectionId = _collectionIds.current();

        idToCollection[collectionId] = Collection(
            collectionId,
            msg.sender,
            _collectionURI
        );

        emit CollectionCreated(collectionId, msg.sender, _collectionURI);

        if (selectedNFTs.length > 0) {    
            for (uint256 i = 0; i < selectedNFTs.length; i++) {
                uint256 nftId = selectedNFTs[i];

                require(_exists(nftId), "NFT does not exist");
                require(idToNFT[nftId].owner == msg.sender, "Not the owner of the NFT");

                idToNFT[nftId].collectionId = collectionId;
            }

            emit NFTsCollectionUpdated(selectedNFTs, msg.sender, collectionId);
        }
    }

    function updateCollection(uint256 collectionId, uint256[] memory selectedNFTs, string memory _newCollectionURI) public {
        require(idToCollection[collectionId].owner == msg.sender, "Not the owner of the collection");

        uint256[] storage existingNFTs = collectionToNFTs[collectionId];

        idToCollection[collectionId].collectionURI = _newCollectionURI;

        emit CollectionMetadataUpdated(collectionId, msg.sender, _newCollectionURI);

        if ( selectedNFTs.length > 0) {
            for (uint256 i = 0; i < selectedNFTs.length; i++) {
                uint256 nftId = selectedNFTs[i];

                require(_exists(nftId), "NFT does not exist");
                require(idToNFT[nftId].owner == msg.sender, "Not the owner of the NFT");
                require(idToNFT[nftId].collectionId == collectionId, "NFT does not belong to the collection");

                bool isDuplicate = false;
                for (uint256 j = 0; j < existingNFTs.length; j++) {
                    if (existingNFTs[j] == nftId) {
                        isDuplicate = true;
                        break;
                    }
                }

                if (!isDuplicate) {
                    existingNFTs.push(nftId);
                }
            }

            emit NFTsCollectionUpdated(selectedNFTs, msg.sender, collectionId);
        }
    }

    function fetchMyCollections() public view returns (Collection[] memory) {
        uint totalCollectionCount = _collectionIds.current();
        uint collectionCount = 0;
        uint currentIndex = 0;

        for (uint i = 0 ; i < totalCollectionCount; i++) {
            if(idToCollection[i+1].owner == msg.sender) {
                collectionCount += 1;
            }
        }

        Collection[] memory collections = new Collection[](collectionCount);

        for (uint i = 0; i < totalCollectionCount; i++) {
            if (idToCollection[i+1].owner == msg.sender) {
                uint currentId = i + 1;

                Collection memory currentCollection = idToCollection[currentId];

                collections[currentIndex] = currentCollection;

                currentIndex += 1;
            }
        }

        return collections;
    }

    function fetchCollectionById(uint256 _collectionId) public view returns (Collection memory) {
        return idToCollection[_collectionId];
    }

    function createToken(string memory tokenURI, uint256 collectionId, uint256 price) public payable returns (uint) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        idToNFT[newTokenId] = NFT(
            newTokenId,
            msg.sender,
            collectionId,
            price
        );

        emit NFTCreated(newTokenId, msg.sender, collectionId, price);

        return newTokenId;
    }

    function fetchMyNFTsByCollection(uint256 collectionId) public view returns(NFT[] memory) {
        uint256 totalNFTCount = _tokenIds.current();
        uint256 nftCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i; i <= totalNFTCount; i++) {
            if (idToNFT[i].collectionId == collectionId && idToNFT[i].owner == msg.sender ) {
                nftCount++;
            }
        }

        NFT[] memory nfts = new NFT[](nftCount);

        for (uint256 i = 1; i <= totalNFTCount; i++) {
            if (idToNFT[i].collectionId == collectionId && idToNFT[i].owner == msg.sender) {
                NFT storage currentNFT = idToNFT[i];
                nfts[currentIndex] = currentNFT;
                currentIndex++;
            }
        }

        return nfts;
    }

    function listNFTForSale(uint256 tokenId, uint256 salePrice, uint256 floorPrice) private {
        require(_exists(tokenId), "NFT does not exist");
        require(idToNFT[tokenId].owner == msg.sender, "Only item owner can perform this operation");
        require(salePrice > 0, "Price must be higher then 0");
        require(msg.value == listingPrice, "Price must be equal to listing price");

        idToNFT[tokenId].owner = address(this);
        idToNFT[tokenId].price = salePrice;

        idToMarketItem[tokenId] = MarketItem({
            tokenId: tokenId,
            seller: payable(msg.sender),
            owner: payable(address(this)),
            price: salePrice,
            floorPrice: floorPrice,
            sold: false
        });

        _transfer(msg.sender, address(this), tokenId);

        emit MarketItemCreated(tokenId, msg.sender, address(this), salePrice, floorPrice, false);
    }

    function resellNFT(uint256 tokenId, uint256 price, uint256 floorPrice) public payable {
        require(idToMarketItem[tokenId].owner == msg.sender, "Only item owner can perform this operation");
        require(idToNFT[tokenId].owner == msg.sender, "Only item owner can perform this operation");
        require(msg.value == listingPrice, "Price must be qual to listing price");

        idToNFT[tokenId].owner = address(this);
        idToNFT[tokenId].price = price;

        idToMarketItem[tokenId].sold = false;
        idToMarketItem[tokenId].price = price;
        idToMarketItem[tokenId].floorPrice = floorPrice;
        idToMarketItem[tokenId].seller = payable(msg.sender);
        idToMarketItem[tokenId].owner = payable(address(this));
        
        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    function createMarketSale(uint256 tokenId) public payable {
        uint price = idToMarketItem[tokenId].price;

        require(msg.value == price, "Please submit the asking price in order to complete the purchase");

        idToNFT[tokenId].owner = msg.sender;

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

        for(uint i = 1; i < itemCount; i++) {
            if(idToMarketItem[i+1].owner == address(this)) {
                uint currentId = i + 1;

                MarketItem storage currentItem = idToMarketItem[currentId];

                items[currentIndex] = currentItem;

                currentIndex += 1;
            }
        }

        return items;
    }

    function fetchNFTDetails(uint256 tokenId) public view returns (NFT memory) {
        require(_exists(tokenId), "NFT does not exist");

        NFT memory nftDetails = idToNFT[tokenId];
        return nftDetails;
    }

    function makeOffer(uint256 tokenId, uint256 expirationDays) public payable {
        require(_exists(tokenId), "NFT does not exists");
        require(expirationDays > 0, "Expiration days must be greater then 0");

        uint256 amount = msg.value;
        uint256 expirationTimestamp = block.timestamp + (expirationDays * 1 days);

        removeExpiredOffers(tokenId);

        tokenIdToOffers[tokenId].push(Offer(msg.sender, amount, expirationTimestamp));
        addressToOffers[msg.sender].push(Offer(msg.sender, amount, expirationTimestamp));

        emit OfferCreated(tokenId, msg.sender, amount, expirationTimestamp);
    }

    function removeExpiredOffers(uint256 tokenId) internal {
        Offer[] storage offers = tokenIdToOffers[tokenId];
        uint256 i = 0;

        while (i < offers.length) {
            if (block.timestamp >= offers[i].expirationTimestamp) {
                if (i < offers.length - 1) {
                    offers[i] = offers[offers.length - 1];
                }
                offers.pop();

                emit OfferRemoved(tokenId, msg.sender);
            } else {
                i++;
            }
        }
    }

    function getOffersByTokenId(uint256 tokenId) public view returns (Offer[] memory) {
        return tokenIdToOffers[tokenId];
    }

    function getOffersByAddress(address bidderAddress) public view returns (Offer[] memory) {
        return addressToOffers[bidderAddress];
    }

}