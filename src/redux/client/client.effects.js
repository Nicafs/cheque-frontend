import { clientTypes } from './client.types';

import api from '../axios';

const url = '/clients';

export const findById = id => dispatch => {
    api.get(`/clients/` & { id })
        .then(payload => {

            return dispatch({
                type: clientTypes.CLIENT_GET,
                payload,
            });

        })
        .catch(err => console.log(err));
}

export const find = () => dispatch => {
    api.get('/clients')
        .then(payload => {

            return dispatch({
                type: clientTypes.CLIENT_GET_ALL,
                payload,
            });

        })
        .catch(err => console.log(err));
}

export const update = (formData, token) => dispatch => {
    const config = {
        headers: {
            'Authorization': token,
        }
    };

    api.put('/clients', formData, config)
        .then(payload => {

            return dispatch({
                type: clientTypes.CLIENT_UPDATE,
                payload,
            });

        })
        .catch(err => console.log(err));
}

export const create = (formData) => dispatch => {

    console.log("Entrou no create - formData:", formData);dispatch({
        type: clientTypes.CLIENT_CREATE,
    })
    return api.post(url, formData)
        .then(payload => {
            //caso tudo ocorra bem, o reducer abaixo vai ser acionado
            dispatch({
                type: clientTypes.CLIENT_CREATE,
                payload,
            })
        })
        .catch(err => console.log(err));
}