import React, {useContext, useState, useEffect} from 'react';
import { AuthContext } from '../context/UserContext';
import { useFetch } from '../hooks/useFetch';
import axios from 'axios';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { Contacts } from '../components/Contacts/Contacts';
import { MyContacts } from '../components/MyContacts/MyContacts';

//import material ui incons
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import './Home.scss'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export const Home = ({logout}) => {
    const [page, setPage] = useState(0)
    const {data:info, loading} = useFetch(page);
    const context = useContext(AuthContext);
    const user_id = context.dataAuth.auth.user_id;
    const [contactData, setContactData] = useState({})
    const [listContact, setListContact] = useState(true)
    const [isLoading, setIsLoading] = useState(true);
    const [dataLoading, setDataLoading] = useState(false)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    

    useEffect(() => {
        getContactId();
    }, [listContact]);
    
    //pagination
    const arrowRight = () => {
        setPage(page + 1);
    }
    const arrowLeft = () => {
        setPage(page - 1);
    }

    //mostrar todos los contactos guardados del usuario
    const getContactId = () => {
        axios
            .get(`http://localhost:4000/contacts/${user_id}`, {})
            .then((response) => {
                const data = response.data.result;
                console.log('getContactId', data);
                setContactData(data)
                setDataLoading(true)
            })
    };
    //eliminar contactos guardados 
    const removeContact = (contact_id) => {
        axios.put(`http://localhost:4000/contacts/${contact_id}`, {})
            .then((response) =>{
                console.log(response)
                setListContact(!listContact)
            })
    }



    return (
        <div>
            <section className='displayflex'>
                <Button variant="outlined" onClick={handleOpen}>Mis contactos</Button>
                <Button variant="outlined" onClick={logout}>Cerrar sesión</Button>
            </section>
            <div className='displayflex'>
                <ArrowBackIcon onClick={() => arrowLeft()} ></ArrowBackIcon>
                <ArrowForwardIcon onClick={() => arrowRight()}></ArrowForwardIcon>
            </div>
            

            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                {isLoading ? (
                    <MyContacts contactData={contactData} removeContact={removeContact}/>
                ) : null}
            </Box>
            </Modal>

            <div className='center'>
                {dataLoading ? <Contacts info={info} page={page} setPage={setPage}/> : null }
                
            </div>
        </div>
    );
};
