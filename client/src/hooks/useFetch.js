import {useEffect, useState} from 'react';
import {getContact} from '../services/api';

export const useFetch = (page) => {

    const [state, setState] = useState({
        data: [],
        loading: true,
    });

    useEffect( () => {

        getContact(page)
            .then(info => {
                setTimeout(() => {
                    setState({
                        data: info,
                        loading: false
                    })
                }, 1000)
                    
                }  
            )
    }, [page])
    console.log(state);

    return state;
}