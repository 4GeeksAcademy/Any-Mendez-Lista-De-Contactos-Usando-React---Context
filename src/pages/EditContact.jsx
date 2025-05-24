import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useGlobalReducer from '../hooks/useGlobalReducer';


const EditContact = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const params = useParams();
    const { store } = useGlobalReducer();

    const handleUpdateContact = async (contact_id) => {
        let updateContact = {
            "name": name,
            "phone": phone,
            "email": email,
            "address": address
        };

        try {
            const response = await fetch(`https://playground.4geeks.com/contact/agendas/anyAgenda/contacts/${contact_id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateContact)
            });

            if (!response.ok) {
                throw new Error("Ocurrió un error al editar el contacto con id: " + contact_id);
            }

        } catch (error) {
            console.log(error)
        }
    };

    useEffect(() => {
        const contact = store.contacts.find((contact)=> contact.id == params.contactId);
        setName(contact.name);
        setPhone(contact.phone);
        setEmail(contact.email);
        setAddress(contact.address);


    }, []);

    return (
        <div>
            <form>
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">
                        Name
                    </label>
                    <input type="text" value={name} className="form-control" id="inputName" onChange={(event) => { setName(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPhone" className="form-label">
                        Phone
                    </label>
                    <input type="text" value={phone} className="form-control" id="inputPhone" onChange={(event) => { setPhone(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">
                        Email
                    </label>
                    <input type="text" value={email} className="form-control" id="inputEmail" onChange={(event) => { setEmail(event.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputAddress" className="form-label">
                        Address
                    </label>
                    <input type="text" value={address} className="form-control" id="inputAddress" onChange={(event) => { setAddress(event.target.value) }} />
                </div>

                <button type="button" className="btn btn-primary" onClick={() => {
                    handleUpdateContact(params.contactId);
                }}>
                    Update Contact
                </button>
            </form>

        </div>
    )
};
export default EditContact