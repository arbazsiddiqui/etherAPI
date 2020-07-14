const request = require('request-promise');
const env = process.env.NODE_ENV || 'production';
const network = process.env.NETWORK || 'rinkeby';
const config = require('../../config')[env];

const fetchLedger = async (walletAddress) => {
	const transactions = await fetchTransactions(walletAddress);
	return createWithdrawalAndDeposits(transactions, walletAddress);
};

const fetchTransactions = async (walletAddress) => {
	try {
		console.log(`Fetching transactions for address ${walletAddress}`);
		const {result: transactions, message, status} = await makeRequest(walletAddress);
		//if no transaction found return empty array
		if (message === 'No transactions found') {
			return []
		}
		if (status !== '1') {
			console.log(`Etherscan responded with an error ${res.result}`);
			throw new Error("Error in making request")
		}
		console.log(`Successfully fetched transactions for address ${walletAddress}`);
		return transactions
	} catch (err) { //if status non 1, it means an erroes has occurred
		console.log(`Error in making request to etherscan for address ${walletAddress}`, {err});
		throw err
	}
};

const makeRequest = (walletAddress) => {
	const options = {
		url: config.etherscan[network].baseUrl,
		qs: {
			module: "account",
			action: "txlist",
			startblock: 0,
			endblock: 99999999,
			sort: "asc",
			apikey: config.etherscan.apiKey,
			address: walletAddress
		},
		method: "GET",
		json: true
	};
	return request(options);
};

const createWithdrawalAndDeposits = (transactions, walletAddress) => {
	const withdrawals = [];
	const deposits = [];
	transactions.forEach((transaction) => {
		if (transaction.from === walletAddress.toLowerCase()) {
			withdrawals.push(transaction)
		}
		if (transaction.to === walletAddress.toLowerCase()) {
			deposits.push(transaction)
		}
	});
	return {
		withdrawals,
		deposits
	}
};

module.exports = {
	fetchLedger
};