# ether-api
[![Build Status](https://travis-ci.org/arbazsiddiqui/log-parser.svg?branch=master)](https://travis-ci.org/arbazsiddiqui/etherAPI)

>An api to get ledger using a wallet address.

### Getting Started

1. Perform a clone of this repo `git clone https://github.com/arbazsiddiqui/etherAPI`
2. Install the required packages `nvm use && npm install`.
3. Run the server `npm start`.
4. This will start the server at port `8000` and with `rinkeby` network. To use `mainnet` network start the server using `NETWORK=mainnet npm start`.
6. To run tests use `npm t`


## API

### /api/v1/getLedger
An api to get ledger using a wallet address.

* **URL**

  /api/v1/getLedger?walletAddress=0xad57e734a41d231650b9085580a4559d87128031

* **Method:**
  
  `GET`
  
*  **URL Params**

   **Mandatory:**
 
   `walletAddress=string`
   Wallet address of the wallet to want to fetch ledger for.

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```
    {
    	"message": "OK",
    	"result": {
    		"walletAddress": "0xad57e734a41d231650b9085580a4559d87128031",
    		"withdrawals": [{}],
    		"deposits": [{}]
    	}
    }
 
* **Error Response:**

  * **Code:** 500 Internal Server Error <br />
    **Content:** `{ "message": "Something went wrong" }`
    
* **Sample Curl:**
    ```
    curl --location --request GET 'http://localhost:8000/api/v1/getLedger?walletAddress=0xad57e734a41d231650b9085580a4559d87128031'
