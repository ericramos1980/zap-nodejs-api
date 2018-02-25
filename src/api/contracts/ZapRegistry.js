// @flow
require('babel-register');
require('babel-polyfill');
const ZapOracle = require('../ZapOracle');

const curveType = {
    "ZapCurveNone": 0,
    "ZapCurveLinear": 1,
    "ZapCurveExponential": 2,
    "ZapCurveLogarithmic": 3
};

class ZapRegistry {
    constructor({eth, address, abiFile}) {
        this.eth = eth;
        this.address = address;
        this.abiFile = abiFile;
        this.contract = eth.contract(abiFile).at(address);
    }


    // for example initiate Provider should get (43254352345, "spaceoracle", 'none', [ ]) in arguments
    async initiateProvider({public_key, title, endpoint_specifier, endpoint_params, from}) {
        try {
            return await this.contract.initiateProvider(
                public_key, 
                title, 
                endpoint_specifier,
                endpoint_params,
                { from }
            );
        } catch(err) {
            throw err;
        }
    }

    async initiateProviderCurve({ specifier, ZapCurveType, curveStart, curveMultiplier, from }) {
        try {
            const curve = curveType[ZapCurveType];
            return await this.contract.initiateProviderCurve(
                specifier,
                curve,
                curveStart,
                curveMultiplier,
                { from }
            );
        } catch(err) {
            throw err;
        }
    }

    async setEndpointParams({ specifier, endpoint_params,from  }) {
        try {
            return await this.contract.setEndpointParams(
                specifier,
                endpoint_params,
                { from }
            );
        } catch(err) {
            throw err;
        }
    }

    // get oracle by address
    async getOracle(address, callback) {
        try {
            const oracle = new ZapOracle(this);
            oracle.address = address;

            // Get the provider's public getRouteKeys
            const public_key = await this.contract.getProviderPublicKey(address);
            oracle.public_key = public_key;
    
            // Get the route keys next
            const route_keys = await this.contract.getRouteKeys();
            oracle.route_keys = route_keys;
    
            // Output loaded object
            callback(null, oracle);
        } catch (err) {
            callback(err);
        }
    }
}

module.exports = ZapRegistry;
