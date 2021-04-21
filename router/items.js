var express = require('express');
var router = express.Router();
var Web3 = require('web3');
var product_contract = require('../contract/product/contract.js');

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
var smartContract = new web3.eth.Contract(product_contract.abi, product_contract.address);



// index
router.get('/', function (req, res, next) {
  var pro_array=new Array();
  smartContract.methods.getNumOfProducts().call({from: req.session.account}).then(function(total_num){
    

    for(let i=0; i<total_num; i++){
      smartContract.methods.getProductStruct(i).call({from: req.session.account}).then(function(pro_info){
        // console.log(pro_info);
        pro_array.push(pro_info);
      
      })
    }

    setTimeout(()=>{
      res.render('items', { title: 'item', item:pro_array });
    },1000);
    

})

})



// create

router.post('/', function (req, res, next) {
  //  console.log(req.session.account);

  smartContract.methods.addProStru(req.session.account,req.body.proname,req.body.proloc,req.body.pronumber).send({
      from: req.session.account, 
      gas: 2000000}).then(function(receipt){

        res.redirect('/items');
      });
})

// show
router.get('/:id', function(req, res, next){
    console.log("[SHOW GET]item id: " + req.params.id);
    var index=req.params.id-1;
    var proInfo;
        smartContract.methods.getProductStruct(index).call({from: req.session.account}).then(function(pro_info){
          proInfo=pro_info;
        })
  
      setTimeout(()=>{
        res.render('show', { title: 'item 조회', item:proInfo, account: req.session.account});
      },100);
  
    })




module.exports = router;