const utils = require('../utils');

const fetchLedger = async (walletAddress) => {
	const transactions = await fetchTransactions(walletAddress);
	return createWithdrawalAndDeposits(transactions, walletAddress);
};

const fetchTransactions = async (walletAddress) => {
	try {
		console.log(`Fetching transactions for address ${walletAddress}`);
		const {result: transactions, message, status} = await utils.makeRequest(walletAddress);
		//if no transaction found return empty array
		if (message === 'No transactions found') {
			return []
		}
		if (status !== '1') {
			throw new Error("Error in making external request")
		}
		console.log(`Successfully fetched transactions for address ${walletAddress}`);
		return transactions
	} catch (err) { //if status non 1, it means an erroes has occurred
		console.log(`Error in making request to etherscan for address ${walletAddress}`, {err});
		throw err
	}
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
	fetchLedger,
	fetchTransactions,
	createWithdrawalAndDeposits
};