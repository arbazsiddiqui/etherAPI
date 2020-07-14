const request = require('request-promise');
const should = require('should');
const sinon = require('sinon');
const utils = require('../../app/utils');
const {mockAPIResponse, mockAPIResponseFailure} = require('../fixtures');

require('../../server');

describe('/getLedger', () => {

	it('returns correct data if address is correct', async () => {
		const apiStub = sinon.stub(utils, 'makeRequest').returns(Promise.resolve(mockAPIResponse));
		const response = await request({
			url: `http://localhost:${config.port}/api/v1/getLedger`,
			qs: {
				walletAddress: "0xad57e734a41d231650b9085580a4559d87128031",
			},
			method: "GET",
			resolveWithFullResponse: true
		});
		apiStub.calledOnce.should.equal(true);
		response.statusCode.should.equal(200);
		const {result, message} = JSON.parse(response.body);
		message.should.equal('OK');
		result.should.have.property('withdrawals');
		result.should.have.property('deposits');
		apiStub.restore()
	});

	it('returns an error if wallet address is wrong', async () => {
		let error;
		try {
			await request({
				url: `http://localhost:${config.port}/api/v1/getLedger`,
				qs: {
					walletAddress: "randomString",
				},
				method: "GET",
				resolveWithFullResponse: true
			});
		} catch (err) {
			error = err;
		} finally {
			error.statusCode.should.equal(400);
		}
	});

	it('returns an error if external call fails', async () => {
		let error, apiStub;
		try {
			apiStub = sinon.stub(utils, 'makeRequest').returns(Promise.resolve(mockAPIResponseFailure));
			await request({
				url: `http://localhost:${config.port}/api/v1/getLedger`,
				qs: {
					walletAddress: "0xad57e734a41d231650b9085580a4559d87128031",
				},
				method: "GET",
				resolveWithFullResponse: true
			});
		} catch (e) {
			error = e;
		} finally {
			error.statusCode.should.equal(500);
			apiStub.restore()
		}
	})
});