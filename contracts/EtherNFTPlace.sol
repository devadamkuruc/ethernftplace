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

    address payable owner;

    mapping(uint256 => Collection) private idToCollection;
    mapping(uint256 => NFT) private idToNFT;
    mapping(uint256 => uint256[]) private collectionToNFTs;


    struct Collection {
        uint256 collectionId;
        address owner;
        string collectionURI;
    }

    struct NFT {
        uint256 tokenId;
        address owner;
        uint256 collectionId;
    }

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
        uint256 collectionId
    );

    event NFTsCollectionUpdated (
      uint256[] nftIds,
      address owner,
      uint256 collectionId  
    );

    constructor() ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender);
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

    function createToken(string memory tokenURI, uint256 collectionId) public payable returns (uint) {
        _tokenIds.increment();

        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        idToNFT[newTokenId] = NFT(
            newTokenId,
            msg.sender,
            collectionId
        );

        emit NFTCreated(newTokenId, msg.sender, collectionId);

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

}