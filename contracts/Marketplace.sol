// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Product {
        uint id;
        address payable owner;
        string name;
        string description; // ✅ New field
        string imageCID;
        uint price;
        bool isSold;
    }

    uint public productCount = 0;
    mapping(uint => Product) public products;

    event ProductUploaded(
        uint id,
        address owner,
        string name,
        string description,
        string imageCID,
        uint price
    );
    event ProductPurchased(uint id, address buyer);
    event ProductUpdated( // ✅ New event
        uint id,
        string name,
        string description,
        string imageCID,
        uint price
    );

    function uploadProduct(
        string memory _name,
        string memory _description, // ✅ Accept description in upload
        string memory _imageCID,
        uint _price
    ) external {
        require(_price > 0, "Price must be greater than zero");

        productCount++;
        products[productCount] = Product(
            productCount,
            payable(msg.sender),
            _name,
            _description,
            _imageCID,
            _price,
            false
        );

        emit ProductUploaded(
            productCount,
            msg.sender,
            _name,
            _description,
            _imageCID,
            _price
        );
    }

    function buyProduct(uint _id) external payable {
        Product storage product = products[_id];
        require(!product.isSold, "Product already sold");
        require(msg.value == product.price, "Incorrect amount");
        require(
            product.owner != msg.sender,
            "Owner cannot buy their own product"
        );

        product.owner.transfer(msg.value);
        product.isSold = true;

        emit ProductPurchased(_id, msg.sender);
    }

    function getProduct(
        uint _id
    )
        external
        view
        returns (
            uint,
            address,
            string memory,
            string memory,
            string memory,
            uint,
            bool
        )
    {
        Product memory product = products[_id];
        return (
            product.id,
            product.owner,
            product.name,
            product.description, // ✅ Include description in getter
            product.imageCID,
            product.price,
            product.isSold
        );
    }

    // ✅ New function to update product info
    function updateProductInfo(
        uint _id,
        string memory _name,
        string memory _description,
        string memory _imageCID,
        uint _price
    ) external {
        Product storage product = products[_id];
        require(
            msg.sender == product.owner,
            "Only owner can update the product"
        );
        require(!product.isSold, "Cannot update a sold product");
        require(_price > 0, "Price must be greater than zero");

        product.name = _name;
        product.description = _description;
        product.imageCID = _imageCID;
        product.price = _price;

        emit ProductUpdated(_id, _name, _description, _imageCID, _price);
    }
}
