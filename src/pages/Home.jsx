import { useEffect } from "react";
import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Link } from "react-router-dom";

// const API_URL_BASE = 'https://playground.4geeks.com/contact';

export const Home = () => {

	const { store, dispatch } = useGlobalReducer()

	const obtenerContactos = async () => {
		try {
			const response = await fetch('https://playground.4geeks.com/contact/agendas/anyAgenda');

			if (!response.ok) {
				throw new Error("Hubo un error obteniendo los contactos");
			}

			const data = await response.json();
			dispatch({ type: 'update_contacts', payload: data })

		} catch (error) {

		}
	};

	const eliminarContacto = async (contactId) => {

		const confirmacion = window.confirm("Are you sure?");

		if (confirmacion) {
			try {
				const response = await fetch(`https://playground.4geeks.com/contact/agendas/anyAgenda/contacts/${contactId}`, {
					method: 'DELETE'
				});

				if (!response.ok) {
					throw new Error("Ocurrió un error al eliminar el contacto con id: " + contactId);
				}
				obtenerContactos();
			} catch (error) {
				console.log(error);
				alert("Hubo un error al eliminar el contacto.");
			}
		}else {
			console.log("Eliminación cancelada por el usuario");
		}
	};

	useEffect(() => {
		obtenerContactos();
	}, []);

	return (
		<div className="container mt-5">
			<div className="mb-3">
				<h1 className="text-center bg-info">Contactos</h1>
			</div>
			<ul className="list-unstyled"> {/* Usamos list-unstyled para quitar los puntos de la lista */}
				{store.contacts.length === 0 ? (
					<p className="text-center text-muted">No hay contactos para mostrar. ¡Añade uno nuevo!</p>
				) : (
					store.contacts.map((contact) => {
						const avatarUrl = `https://picsum.photos/id/${contact.id % 1000}/80/80`;

						return (
							<li key={contact.id} className="d-flex align-items-center justify-content-between p-3 my-2 border rounded shadow-sm">
								{/* Sección de la imagen de perfil */}
								<div className="me-3">
									<img
										src={avatarUrl}
										alt={`${contact.name}'s avatar`}
										className="rounded-circle"
										style={{ width: '80px', height: '80px', objectFit: 'cover' }}
									/>
								</div>

								<div className="flex-grow-1">
									<h5 className="mb-1">{contact.name}</h5>
									<p className="mb-0 text-muted">
										<i className="fa-solid fa-location-dot me-2"></i>{contact.address}
									</p>
									<p className="mb-0 text-muted">
										<i className="fa-solid fa-phone me-2"></i>{contact.phone}
									</p>
									<p className="mb-0 text-muted">
										<i className="fa-solid fa-envelope me-2"></i>{contact.email}
									</p>
								</div>

								<div className="ms-3">
									<Link to={`/edit-contact/${contact.id}`} className="text-decoration-none">
										<i className="fa-solid fa-pencil text-info me-3"></i>
									</Link>
									<i
										className="fa-solid fa-trash-can text-info"
										onClick={() => { eliminarContacto(contact.id) }}
										style={{ cursor: 'pointer' }}
									></i>
								</div>
							</li>
						);
					})
				)}
			</ul>
		</div>
	);
};



// <div className="mt-5">
// 	<h1 className="text-center bg-info">Contactos</h1>
// 	<ul>
// 		{store.contacts.map((contact, index) => {
// 			return (
// 				<div key={contact.id} className="d-flex justify-content-between">
// 					<div>
// 						<li> {contact.name} - {contact.address} - {contact.phone} - {contact.email} </li>
// 					</div>
// 					<div>
// 						<i className="fa-solid fa-trash-can me-3" onClick={() => { eliminarContacto(contact.id) }}></i>
// 						<Link to={`/edit-contact/${contact.id}`}> <i className="fa-solid fa-pencil me-3"> </i></Link>
// 					</div>
// 				</div>
// 			)
// 		})}
// 	</ul>
// </div>