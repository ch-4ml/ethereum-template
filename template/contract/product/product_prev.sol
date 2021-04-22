pragma solidity 0.5.8;

contract ProductContract {
    uint8 numberOfProducts; // 총 제품의 수입니다.
    uint8 numberOfPerchaes;

    struct myStruct {
        address creator;
        string productName;
        string locaton;
        uint number;
        uint timestamp;
    }

    struct Buy{
        uint buy_num;
        address buyer;
        bool status;
    }

    event product (
        string productName,
        string location,
        uint number,
        uint timestamp
    );

    myStruct[] public productes;
    Buy[] public purchaes;

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

    function buyProduct(uint _num, address _buyer, bool _status) public {
        purchaes.push(Buy(_num, _buyer, _status))-1;
        numberOfPerchaes++;
    }

    function getNumOfPerchaes() public view returns(uint8){
        return numberOfPerchaes;
    }

    function getPerchaseInfo(uint _index) public view returns (uint, address, bool){
        return (purchaes[_index].buy_num, purchaes[_index].buyer, purchaes[_index].status);
    }
    
    // apply까지 한 후 생각!
    // function rateProduct(string _proName, uint _score) public{
        
    // }
}