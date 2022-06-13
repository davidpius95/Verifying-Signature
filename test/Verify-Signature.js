const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("VerifySignature", function () {
  it("Check signature", async function () {
	  const accounts = await ethers.getSigners(2)
    const VerifySignature = await ethers.getContractFactory("VerifySignature");
    const contract = await VerifySignature.deploy();
    await contract.deployed();

	const signer = accounts[0]
	const to = accounts[1].address
	const amount = 999
	const message = "David Pius"
	const nonce  = 1 
	const hash = await contract.getMessageHash(to, amount, message, nonce)
	// need to sign the message and type cast from string to bytes

	const sig = await signer.signMessage(ethers.utils.arrayify(hash))
	/*
	  address _to,
        uint _amount,
        string memory _message,
        uint _nonce
    ) bytes32 memory signature {

	*/
expect(await contract.verify(signer.address,to,amount,message,nonce,sig)).to.equal(true)
expect (await contract.verify(signer.address, to, amount+2, message, nonce,sig)).to.equal(false)

  });
});
