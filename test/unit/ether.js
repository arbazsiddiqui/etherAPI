const should = require('should');
const sinon = require('sinon');
const utils = require('../../app/utils');
const {fetchTransactions, createWithdrawalAndDeposits} = require('../../app/controllers/etherController');
const {mockAPIResponse, mockAPIResponseFailure, mockAPIResponseEmpty} = require('../fixtures');


describe('fetchTransactions', () => {
	it('should parse the fetched transactions if response is correct', async () => {
		const apiStub = sinon.stub(utils, 'makeRequest').returns(Promise.resolve(mockAPIResponse));
		const transactions = await fetchTransactions("0xad57e734a41d231650b9085580a4559d87128031");
		transactions.should.deepEqual(mockAPIResponse.result);
		apiStub.restore()
	});

	it('throws if response is incorrect', async () => {
		let apiStub, error;
		try {
			apiStub = sinon.stub(utils, 'makeRequest').returns(Promise.resolve(mockAPIResponseFailure));
			await fetchTransactions("0xad57e734a41d231650b9085580a4559d87128031")
		} catch (e) {
			error = e
		} finally {
			error.message.should.equal("Error in making external request");
			apiStub.restore()
		}
	});

	it('returns empty array if response is empty', async () => {
		const apiStub = sinon.stub(utils, 'makeRequest').returns(Promise.resolve(mockAPIResponseEmpty));
		const transactions = await fetchTransactions("0xad57e734a41d231650b9085580a4559d87128031");
		transactions.should.deepEqual([]);
		apiStub.restore()
	});
});

describe('createWithdrawalAndDeposits', () => {
	it('creates deposits and withdrawals from transactions', () => {
		const {withdrawals, deposits} = createWithdrawalAndDeposits(mockAPIResponse.result, "0xad57e734a41d231650b9085580a4559d87128031");
		withdrawals.should.deepEqual([mockAPIResponse.result[1]]);
		deposits.should.deepEqual([mockAPIResponse.result[0]])
	})
});