import React, { useState } from 'react'

const CreateContact = () => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");

    const handleRegisterContact = async() =>{
        let newContact = {
            "name": name,
            "phone": phone,
            "email": email,
            "address": address
        };
        try {
            const response = await fetch('https://playground.4geeks.com/contact/agendas/anyAgenda/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(newContact)
            });

            if(!response.ok){
                throw new Error("Ocurrió un error al crear el contacto");
            }

            setName("");
            setPhone(""),
            setEmail("");
            setAddress("");

        } catch (error) {
            
        }
    };


    return (
        <div className="container mt-5">
            <h1 className='text-center bg-info'>Add a new contact</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="inputName" className="form-label">
                        Name
                    </label>
                    <input type="text" value={name} className="form-control" id="inputName" onChange={(event)=>{ setName(event.target.value)}} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPhone" className="form-label">
                        Phone
                    </label>
                    <input type="text" value={phone} className="form-control" id="inputPhone" onChange={(event)=>{ setPhone(event.target.value)}} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">
                        Email
                    </label>
                    <input type="text" value={email} className="form-control" id="inputEmail" onChange={(event)=>{ setEmail(event.target.value)}} />
                </div>
                <div className="mb-3">
                    <label htmlFor="inputAddress" className="form-label">
                        Address
                    </label>
                    <input type="text" value={address} className="form-control" id="inputAddress" onChange={(event)=>{ setAddress(event.target.value)}} />
                </div>
                <div className='d-flex justify-content-center row'>
                <button type="button" className="btn btn-primary" onClick={()=>{
                    handleRegisterContact();
                }}>
                    Save
                </button>
                </div>
            </form>

        </div>
    )
}

export default CreateContact;