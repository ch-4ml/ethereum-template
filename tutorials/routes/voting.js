const express = require("express");
const router = express.Router();

const Web3 = require("web3");
const web3 = new Web3("http://localhost:7545");
const contract = require("../contract/voting.js")
const sc = new web3.eth.Contract(contract.abi, contract.address)

// Voting 페이지로 이동
router.get("/", async function(req, res, next) {
  try {
    const accounts = await web3.eth.getAccounts();
    const blockNumber = await web3.eth.getBlockNumber();
    const candidates = await getAllCandidates();

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

// 투표
router.put("/", async function(req, res) {
  const name = req.body.name;
  try {
    const accounts = await web3.eth.getAccounts();
    const candidate = await web3.utils.fromAscii(name);
    await sc.methods.voteForCandidate(candidate).send({ from: accounts[0] });
    const candidates = await getAllCandidates();

    const blockNumber = await web3.eth.getBlockNumber();
    
    res.status(200).send({ blockNumber, candidates, msg: `${name}에게 투표했습니다.` });
  } catch(err) {
    console.log(err);
    res.status(200).send({ msg: "투표에 실패했습니다." });
  }
});

// 후보자 추가
router.post("/", async function(req, res) {
  const name = req.body.name;
  try {
    const accounts = await web3.eth.getAccounts();
    const candidate = await web3.utils.fromAscii(name);

    // 작성한 contract에 있는 setCandidate 함수 호출
    await sc.methods.setCandidate(candidate).send({ from: accounts[0] });
    const candidates = await getAllCandidates();

    const blockNumber = await web3.eth.getBlockNumber();
    res.status(200).send({ blockNumber, candidates, msg: `후보 ${name}을(를) 추가했습니다.` });
  } catch(err) {
    console.log(err);
    res.status(200).send({ msg: "후보를 추가하지 못했습니다." })
  }
})

// 모든 후보자 정보(이름, 득표수)를 조회하는 함수
async function getAllCandidates() {
  const candidateList = await sc.methods.getAllCandidates().call();

  let candidates = [];
  for(let candidate of candidateList) {
    candidates.push({
      name: web3.utils.toAscii(candidate),
      votes: await sc.methods.totalVotesFor(candidate).call()
    });
  }

  // [{ name: 'Rama', votes: 0 }, { name: 'Nick', votes: 0 }, { name: 'Jose', votes: 0 }]
  return candidates;
}

module.exports = router;