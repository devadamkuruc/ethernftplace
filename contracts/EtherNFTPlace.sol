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

    struct Collection {
        uint256 collectionId;
        address owner;
        string collectionURI;
        uint256[] nfts;
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

    event NFTCreated (
        uint indexed tokenId,
        address owner,
        uint256 collectionId
    );

    constructor() ERC721("Metaverse Tokens", "METT") {
        owner = payable(msg.sender);
    }

    function createCollection(string memory _collectionURI) external {
        uint256 collectionId = _collectionIds.current();

        _collectionIds.increment();

        idToCollection[collectionId] = Collection(
            collectionId,
            msg.sender,
            _collectionURI,
            new uint256[](0)
        );

        emit CollectionCreated(collectionId, msg.sender, _collectionURI);
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

                Collection storage currentCollection = idToCollection[currentId];

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

    function fetchNFTsByCollection(uint256 collectionId) public view returns(NFT[] memory) {
        uint256 totalNFTCount = _tokenIds.current();
        uint256 nftCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i; i <= totalNFTCount; i++) {
            if (idToNFT[i].collectionId == collectionId) {
                nftCount++;
            }
        }

        NFT[] memory nfts = new NFT[](nftCount);

        for (uint256 i = 1; i <= totalNFTCount; i++) {
            if (idToNFT[i].collectionId == collectionId) {
                NFT storage currentNFT = idToNFT[i];
                nfts[currentIndex] = currentNFT;
                currentIndex++;
            }
        }

        return nfts;
    }

}