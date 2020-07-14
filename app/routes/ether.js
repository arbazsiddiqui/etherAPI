const express = require('express');
const router = express.Router();

var {validate} = require('cryptocurrency-address-validator');

const {fetchLedger} = require('../controllers/etherController');

router.get('/getLedger', async (req, res) => {
	try {
		const {walletAddress} = req.query;

		if (!validate(walletAddress, 'ethereum')) {
			return res.status(400).send({
				message: "Invalid wallet address",
				result: {}
			})
		}

		const {withdrawals, deposits} = await fetchLedger(walletAddress);

		return res.status(200).send({
			message: "OK",
			result: {
				walletAddress,
				withdrawals,
				deposits
			}
		})
	} catch (err) {
		console.log(err);
		return res.status(500).send({message: "Something went wrong"})
	}
});

module.exports = router;