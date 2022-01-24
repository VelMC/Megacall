import axios from 'axios';
import React, {useContext, useState} from 'react';

import {AuthContext} from '../../context/UserContext';

import './Contacts.scss';

export const Contacts = ({info, loading}) => {
    const {dataAuth} = useContext(AuthContext);
    const [newContact, setNewContact] = useState({
        name: "",
        lastname: "",
        email: "",
        phone: "",
        img: "",
    });

    const addContact = (data) => {
        console.log('addContact data', data); 
        setNewContact({...newContact, ["name"]: data.name, ["lastname"]: data.lastname, ["email"]: data.email, ["phone"]: data.phone, ["img"]: data.img});

        handleSubmit();
    }
    console.log('addContact newContact', newContact)

    const handleSubmit = () => {
        const user_id = dataAuth.auth.user_id;
        try {
            axios
                .post(`http://localhost:4000/contacts/add`, {
                    user_id: user_id,
                    name: newContact.name,
                    lastname: newContact.lastname,
                    phone: newContact.phone,
                    email: newContact.email,
                    img: newContact.img
                })
                .then((response) => {
                    console.log('post addcontact', response)
                })
        } catch (error) {
            
        }
    }


    return <div className='contacts'>
        {loading && <p>Loading...</p>}
                    
            {info.map((contact, idx) => {
                return (
                    <div 
                        className='miniCard'
                        key={idx}
                    >
                        <img src={contact.img} alt={contact.name} />
                        <h5>{contact.name} {contact.lastname}</h5>
                        <p>{contact.email}</p>
                        <div>
                            <button className='add' onClick={() => addContact(contact)}
                            >
                                +
                            </button>
                        </div>
                    </div>
                )
            })}
    </div>;
};
