import {request} from './base.js';
import {request_data} from '../../data/VAT_requests_data.js';


const user_document_VAT_PATCH = async (token) => request
    .patch('/api/me/scans/235abd13-4150-4e9f-e9e3-08dac681db51/tariffs')
    .set('content-type', 'application/json')
    .auth(token, {type: 'bearer'})
    .send(request_data)
    .then((res) => {
        if (res.body.data && res.body.data.error) {
            throw Error(JSON.stringify(res.body.data.error.details));
        };

    })
    .catch(err => err.response)


export {
    user_document_VAT_PATCH
}