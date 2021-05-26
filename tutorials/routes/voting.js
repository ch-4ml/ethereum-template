const express = require("express");
const router = express.Router();

const Web3 = require("web3");
const web3 = new Web3("http://localhost:7545");
const contract = require("../contract/voting.js")
const sc = new web3.eth.Contract(contract.abi, contract.address)

// Go to "Voting" page
router.get("/", async function(req, res, next) {
  try {
    const accounts = await web3.eth.getAccounts();
    const blockNumber = await web3.eth.getBlockNumber();
    const candidateList = await sc.methods.getAllCandidates().call();
    console.log(candidateList);

    let candidates = [];
    for(let candidate of candidateList) {
      candidates.push({
        name: web3.utils.toAscii(candidate),
        votes: await sc.methods.totalVotesFor(candidate).call()
      });
    }

    console.log(candidates);

    const data = {
      title: "Voting example",
      accounts,   // accounts: accounts
      blockNumber, // blockNumber: blockNumber
      candidates
    };

    res.render("voting", data);  
  } catch(err) {
    console.log(err);
    res.status(500).send();
  }
});

// Vote
router.put("/", async function(req, res) {
  const name = req.body.name;
  try {
    const nameToBytes = await web3.utils.fromAscii(name);
    console.log(nameToBytes);

    res.status(200).send();
  } catch(err) {
    console.log(err);
    res.status(500).send();
  }
});

module.exports = router;