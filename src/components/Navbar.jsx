import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<button className="btn btn-info">Go to Contacts</button>
				</Link>
				<div className="ml-auto">
					<Link  to={'/create-new-contact'}>
						<button className="btn btn-info">Add a new contact</button>
					</Link>
				</div>
			</div>
		</nav>
	);
};