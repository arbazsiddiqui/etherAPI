const mockAPIResponse = {
	"status": "1",
	"message": "OK",
	"result": [
		{
			"blockNumber": "3390936",
			"timeStamp": "1542992657",
			"hash": "0x70af673720af21a8c16fcf9b06e3e86f75e095f249f0fc07db963811c22f7203",
			"nonce": "224875",
			"blockHash": "0x7d9768d0b6d9dc179785fc9f29bbe4ae70d7abd0ca9faa7e6839fd5bcbda7aa4",
			"transactionIndex": "8",
			"from": "0x31b98d14007bdee637298086988a0bbd31184523",
			"to": "0xad57e734a41d231650b9085580a4559d87128031",
			"value": "3000000000000000000",
			"gas": "21000",
			"gasPrice": "1000000000",
			"isError": "0",
			"txreceipt_status": "1",
			"input": "0x",
			"contractAddress": "",
			"cumulativeGasUsed": "1008196",
			"gasUsed": "21000",
			"confirmations": "3447923"
		},
		{
			"blockNumber": "3390978",
			"timeStamp": "1542993287",
			"hash": "0x2a841f6baf92d3f849b1c96786f497ee446639f15cc84e575f3a255a50c57d79",
			"nonce": "0",
			"blockHash": "0xf6da39cc9939408b1a8f3828555e4f33ea7e8a8aab4eb771c1a24c276de75312",
			"transactionIndex": "6",
			"from": "0xad57e734a41d231650b9085580a4559d87128031",
			"to": "0xef19e7ec9ee90a0426c60e74afcc504c02513e11",
			"value": "1000000000000000",
			"gas": "21000",
			"gasPrice": "2500000000",
			"isError": "0",
			"txreceipt_status": "1",
			"input": "0x",
			"contractAddress": "",
			"cumulativeGasUsed": "676791",
			"gasUsed": "21000",
			"confirmations": "3447881"
		}
	]
};

const mockAPIResponseFailure = {
	"status": "0",
	"message": "NOTOK",
	"result": "Error! Invalid address format"
};

const mockAPIResponseEmpty = {
	"status": "0",
	"message": "No transactions found",
	"result": []
};

module.exports = {
	mockAPIResponse,
	mockAPIResponseFailure,
	mockAPIResponseEmpty
};