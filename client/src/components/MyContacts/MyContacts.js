import axios from "axios";
import React, {useState} from "react";
import './MyContacts.scss';
import { Search } from "../Search/Search";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
export const MyContacts = ({contactData, removeContact}) => {
    const [searchedValue, setSearchedValue] = useState('');
    const [infoSearched, setInfoSearched] = useState('');
    console.log('contactdata', contactData)
    console.log(searchedValue)

    

    return(
        <div>
            {/* <h1>NO FUNCIONA</h1> */}
            {/* <div>
                <Search searchedValue={searchedValue} setSearchedValue={setSearchedValue} getContactName={getContactName()}/>
            </div> */}
            {infoSearched ? 
                ( 
                    <div> <img src={infoSearched.img} alt='name' />
                    <h6>{infoSearched.name}</h6></div>
                )
                :
                (
                    <div className='modal'>
                        {contactData.map((data, idx) => {
                            return (
                                <div className="miniData" key={idx}>
                                    <img src={data.img} alt='name' />
                                    <h6>{data.name}</h6>
                                    <p>{data.email}</p>
                                    <button onClick={() => {removeContact(data.contact_id)}}> <DeleteOutlineIcon /> </button>
                                </div>
                                
                            )
                        })}
                    </div>
                )
            }
        </div>
    );
    
    
};
