// geth console 명령

// 계정 목록 확인
eth.accounts;

// Etherbase 조회
eth.coinbase;

// Etherbase 변경
miner.setEtherbase(eth.accounts[1]);

// 잔고 확인
eth.getBalance(eth.accounts[0]);

// Block number 확인
eth.blockNumber;

// 채굴 (사용할 스레드 수)
miner.start();

// 채굴 종료
miner.stop();

// 계정 잠금 해제 및 Ether 송금
personal.unlockAccount(eth.accounts[1]);
eth.sendTransaction({ from: eth.accounts[1], to: eth.accounts[2], value: web3.toWei(10, 'ether') });

// 트랜잭션 조회
eth.getTransaction('YOUR_TRANSACTION_ADDRESS');

// 미처리된 트랜잭션 조회
eth.pendingTransactions;

// 이더 단위로 잔고 확인
web3.fromWei(eth.getBalance(eth.accounts[1]), 'ether');

// 컨트랙트 배포 시나리오
// 필요한 변수 선언
let abi, bytecode, address, helloWorld, helloWorldContract, helloWorldInstance, newHelloWorld;

// 컨트랙트 컴파일 후 얻은 정보를 미리 변수에 할당
abi = '[YOUR_ABI]';
bytecode = '0x[YOUR_BYTECODE]';

// 컨트랙트 객체 정의
helloWorldContract = eth.contract(abi);

// 컨트랙트 배포
helloWorldInstance = helloWorldContract.new(
  'Hello World!',
  {
    from: eth.accounts[1],
    data: bytecode,
    gas: 1000000
  },
  function (e, contract) {
    if (e) {
      console.log('err creating contract', e);
    } else {
      if (!contract.address) {
        console.log(
          'Contract transaction send: TransactionHash: ' + contract.transactionHash + ' waiting to be mined...'
        );
      } else {
        console.log('Contract mined! Address: ' + contract.address);
        address = contract.address;
        console.log(JSON.parse(contract));
      }
    }
  }
);

// 배포 완료된 컨트랙트 인스턴스 확인
helloWorldInstance;

// 데이터 조회 함수 호출
// 인스턴스.함수명.call();
helloWorldInstance.greet.call();

// 데이터 변경 함수 호출
// 인스턴스.함수명.sendTransaction(매개변수, 옵션);
helloWorldInstance.setGreeting.sendTransaction('Hello World!!!', { from: eth.accounts[1] });

// 네트워크에 배포된 컨트랙트의 ABI와 주소를 이용해서 접근하기
newHelloWorld = eth.contract(helloWorld.abi);

newHelloWorld.at(address).greet.call();
newHelloWorld.at(address).setGreeting.sendTransaction('Hello Ethereum!', { from: eth.accounts[1] });
