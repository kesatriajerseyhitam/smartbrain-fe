import React from 'react';
import axios from 'axios';

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email		: ``,
			name		: ``,
			password: ``,
		}
	}

	onEmailChange 		= (event) => this.setState({email: event.target.value})
	onNameChange 			= (event) => this.setState({name: event.target.value})
	onPasswordChange	= (event) => this.setState({password: event.target.value})
	onSubmit					= (e) => {
		e.preventDefault();
		axios.post(`https://smartbrain-be.herokuapp.com//signup`, {
			email: this.state.email,
			name: this.state.name,
			password: this.state.password
		})
		.then(user => {
			if (user) {
	 			this.props.loadUser(user);
				this.props.onRouteChange(`signin`);
			}
		})
	}

	render () {
		return (
			<article className="flex flex-wrap pv3 mt4 br2 w-50-m w-40-l shadow-1 center">
				<form className="measure w-100 center">
					<fieldset className="b--white" id="sign-up">
						<legend className="ph2 white">Sign Up:</legend>
						<div className="form-group flex flex-wrap mt2 w-80 center">
							<label className="moon-gray f7 w-100">Name: </label>
							<input className="mt2 pv1 ph2 ba bg-transparent moon-gray f6 w-100"
								type="text"
								name="name"
								onChange={this.onNameChange} />
						</div>
						<div className="form-group flex flex-wrap mt2 w-80 center">
							<label className="moon-gray f7 w-100">Email: </label>
							<input className="mt2 pv1 ph2 ba bg-transparent moon-gray f6 w-100"
								type="email"
								id="email"
								onChange={this.onEmailChange} />
						</div>
						<div className="form-group flex flex-wrap mt2 w-80 center">
							<label className="moon-gray f7 w-100">Password: </label>
							<input className="mt2 pv1 ph2 ba bg-transparent mb2 moon-gray f6 w-100"
								type="password"
								id="password"
								onChange={this.onPasswordChange} />
						</div>
						<div className="submit-wrapper mt3 mb4 w-80 center">
							<input className="bg-white black pv2 ph3 br2 ba b--black-0 f6 pointer grow"
								onClick={this.onSubmit}
								type="submit" value="Signup"/>
						</div>
					</fieldset>
				</form>
			</article>
		);
	}
}

export default Signup