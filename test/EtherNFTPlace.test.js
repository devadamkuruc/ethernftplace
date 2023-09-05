const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("EtherNFTPlace", function () {
  let etherNFTPlace;
  let owner;
  let user;

  before(async () => {
    [owner, user] = await ethers.getSigners();

    const EtherNFTPlace = await ethers.getContractFactory("EtherNFTPlace");
    etherNFTPlace = await EtherNFTPlace.deploy();
    await etherNFTPlace.deployed();
  });

  it("Should deploy the contract with the correct name and symbol", async function () {
    expect(await etherNFTPlace.name()).to.equal("Metaverse Tokens");
    expect(await etherNFTPlace.symbol()).to.equal("METT");
  });

  it("Should allow the owner to create a collection", async function () {
    const collectionURI = "ipfs://your-collection-uri";
    await etherNFTPlace.connect(owner).createCollection(collectionURI);

    // Check if the collection was created
    const collections = await etherNFTPlace.collectionsByOwner(owner.address);
    expect(collections.length).to.equal(1);

    const createdCollection = collections[0];
    expect(createdCollection.owner).to.equal(owner.address);
    expect(createdCollection.collectionURI).to.equal(collectionURI);
  });

  it("Should not allow other users to create a collection", async function () {
    const collectionURI = "ipfs://your-collection-uri";
    await expect(
      etherNFTPlace.connect(user).createCollection(collectionURI)
    ).to.be.revertedWith("Only the collection owner can perform this action");
  });
});
