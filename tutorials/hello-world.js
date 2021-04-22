// Create an instance of the smart contract, passing it as a property,
// which allows web3.js to interact with it.
function HelloWorld(Contract) {
  this.web3 = null;
  this.instance = null;
  this.Contract = Contract;
}

// Initializes the 'HelloWorld' object and creates an instance of the web3.js library.
HelloWorld.prototype.init = function() {
  // Creates a new Web3 instance using a provider
  // Learn more: https://web3js.readthedocs.io/en/v1.3.4/index.html
  this.web3 = new Web3(
    (window.web3 && window.web3.currentProvider) || 
      new Web3.providers.HttpProvider(this.Contract.endpoint)
  );

  // Creates the contract interface using the web3.js contract object
  // Learn more: https://web3js.readthedocs.io/en/v1.3.4/web3-eth-contract.html#new-contract
  const contract_interface = this.web3.eth.contract(this.Contract.abi);

  // Defines the address of the contract instance
  this.instance = this.Contract.address
                    ? contract_interface.at(this.Contract.addresss)
                    : { message: () => {} };
};

// Gets the 'message' value stored on the instance of the contract.
HelloWorld.prototype.getMessage = function(cb) {
  this.instance.message(function(error, result) {
    cb(error, result)
  });
};

// Updates the 'message' value on the instance of the contract.
// This function is triggered when someone clicks the "send" button in the interface.
HelloWorld.prototype.setMessage = function() {
  const that = this;
  const msg = $("#message-input").val();
  this.showLoader(true);

  // Sets message using the public update function of the smart contract
  this.instance.update(
    msg,
    {
      from: window.web3.eth.accounts[0],
      gas: 100000,
      gasPrice: 100000,
      gasLimit: 100000
    },
    function(error, txHash) {
      if (error) {
        console.log(error);
        that.showLoader(false);
      } else {
        // If success, wait for confirmation of transaction,
        // then clear form value
        that.waitForReceipt(txHash, function(receipt) {
          that.showLoader(false);
          if (receipt.status) {
            console.log({ receipt });
            $("#message-input").val("");
          } else {
            console.log(error);
          }
        });
      }
    }
  )
}

// Waits for receipt of transaction
HelloWorld.prototype.waitForReceipt = function(hash, cb) {
  const that = this;

  // Checks for transaction receipt using web3.js library method
  this.web3.eth.getTransactionReceipt(hash, function(err, receipt) {
    if (err) {
      error(err);
    }
    if (receipt !== null) {
      // Transaction went through
      if (cb) {
        cb(receipt);
      } else {
        // Try again in 2 second
        window.setTimeout(function() {
          that.waitForReceipt(hash, cb);
        }, 2000);
      }
    }
  });
}

HelloWorld.prototype.onReady = function() {
  this.init();
  // Don't show interactive UI elements like input/button until
  // the contract has been deployed.
  if (this.hasContractDeployed()) {
    this.updateDisplayContent();
    this.bindButton();
  }
  this.main();
};