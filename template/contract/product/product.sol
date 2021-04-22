pragma solidity 0.5.8;

contract ProductContract {
    uint8 numberOfProducts; // 총 제품의 수입니다.
   

    struct myStruct {
        address creator;
        string productName;
        string locaton;
        uint number;
        uint timestamp;
    }

    struct Buy{
        address owner;
        address buyer;
    }

    event product (
        string productName,
        string location,
        uint number,
        uint timestamp
    );

    myStruct[] public productes;
    Buy[] public purchase;

    function addProStru (address _proCreator, string memory _firstString, string memory _secondString, uint _initNumber) public {
        productes.push(myStruct(_proCreator, _firstString, _secondString, _initNumber, block.timestamp)) -1;
        
        numberOfProducts++;
        emit product(_firstString, _secondString, _initNumber, block.timestamp);
    }

    //제품 등록의 수를 리턴합니다.
    function getNumOfProducts() public view returns(uint8) {
        return numberOfProducts;
    }

    //번호에 해당하는 제품의 이름을 리턴합니다.
    function getProductStruct(uint _index) public view returns (address , string memory, string memory, uint, uint) {
        return (productes[_index].creator, productes[_index].productName, productes[_index].locaton, productes[_index].number, productes[_index].timestamp);
    }

    function buyProduct(address payable _owner, address _buyer) public payable {
        require(msg.value >= 0.1 ether);
        _owner.transfer(msg.value);
        purchase.push(Buy(_owner, _buyer))-1;
   
    }

    function getPurchaseInfo(uint _index) public view returns (address, address){
        return (purchase[_index].owner, purchase[_index].buyer);
    }
    
 
}