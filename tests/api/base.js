import('chai/register-should.js');
import {use} from 'chai';
import chaiHttp from 'chai-http';

const chai = use(chaiHttp);
const request = chai.request('https://api.okioki.app');


export {
    request
};
