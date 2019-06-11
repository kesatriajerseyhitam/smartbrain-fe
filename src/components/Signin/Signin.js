import React, { Component } from 'react';
import axios from 'axios';

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email		: ``,
			password: ``
		}
	}

	onEmailChange 		= (event) => this.setState({email: event.target.value})
	onPasswordChange 	= (event) => this.setState({password: event.target.value})
	onSubmit			= (e) => {
		e.preventDefault();
		axios.post('https://smartbrain-be.herokuapp.com//signin', {
			email: this.state.email,
			password: this.state.password
		}).then(data => {
			if (data) {
				this.props.loadUser(data.data);
				this.props.onRouteChange(`home`);
			}
		}).catch(err => console.log(err));
	}

	render() {
		const { onRouteChange } = this.props;
		return (
			<article className="flex flex-wrap pv3 mt4 br2 w-50-m w-40-l shadow-1 center">
				<form className="measure w-100 center">
					<fieldset className="b--white" id="sign-up">
						<legend className="ph2 white">Sign In:</legend>
						<div className="form-group flex flex-wrap mt2 w-80 center">
							<label className="moon-gray f7 w-100">Email: </label>
							<input className="mt2 pv1 ph2 ba bg-transparent moon-gray f6 w-100"
								type="email"
								name="email-address"
								id="email"
								onChange={this.onEmailChange} />
						</div>
						<div className="form-group flex flex-wrap mt2 w-80 center">
							<label className="moon-gray f7 w-100">Password: </label>
							<input className="mt2 pv1 ph2 ba bg-transparent mb2 moon-gray f6 w-100"
								type="password"
								name="password"
								id="password"
								onChange={this.onPasswordChange} />
						</div>
					<div className="submit-wrapper mt3 mb4 w-80 center">
						<input className="bg-white black pv2 ph3 br2 ba b--black-0 f6 pointer grow"
							onClick={ this.onSubmit }
							type="submit" value="Signin"/>
						<span className="ml3 gray hover-hot-pink f7 pointer"
							onClick={() => onRouteChange(`signup`)}>
							Register here</span>
					</div>
					</fieldset>
					</form>
				</article>
		);
	}
}

export default Signin