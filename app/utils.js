const request = require('request-promise');
const network = process.env.NETWORK || 'rinkeby';

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

module.exports = {
	makeRequest
};