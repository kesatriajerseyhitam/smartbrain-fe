import React, { Component } from 'react';
import './App.css';

import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Navigation from './components/Navigation/Navigation';
import Particles from 'react-particles-js';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import axios from 'axios';

const particlesOptions = {
	particles: {
		number: {
			value: 30,
			density: {
				enable: true,
				value_area: 800
			}
		}
	}
}
const initialState = {
	input				: '',
	imageUrl		: '',
	box					: {},
	route				: 'home',
	isSignedIn	: false,
	user				: {
		id				: ``,
		name			: ``,
		email			: ``,
		password	: ``,
		entries		: 0,
		joined		: '',
	}
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

	calculateFaceLocation = (data) => {
		const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
		const image = document.getElementById(`inputImage`);
		const width = Number(image.width);
		const height = Number(image.height);
		return {
			leftCol: clarifaiFace.left_col * width,
			topRow: clarifaiFace.top_row * height,
			rightCol: width - (clarifaiFace.right_col * width),
			bottomRow: height - (clarifaiFace.bottom_row * height)
		}
	}
	displayBox 						= (box) => this.setState({box: box})
	loadUser 							= (data) => {
		this.setState({user: {
				id			: data.id,
				name		: data.name,
				email		: data.email,
				entries	: data.entries,
				joined	: data.joined
			}
		})
	}
	onInputChange 				= (event) => this.setState({input: event.target.value });
	onSubmit 							= () => {
		this.setState({imageUrl: this.state.input})
		axios.post(`https://smartbrain-be.herokuapp.com//imageUrl`, {
			input: this.state.input
		})
		.then(response => {
			if (response) {
				axios.put(`https://smartbrain-be.herokuapp.com//image`, {
						id: this.state.user.id
				}).then(count => {
					this.setState(Object.assign(
						this.state.user, { entries: count.data }
					))
				})
			}
			this.displayBox(this.calculateFaceLocation(response))
		})
		.catch(err => console.log(err))
	}
	onRouteChange 				= (route) => {
		if (route === `signout` || route === `signin`) {
			this.setState(initialState);
		} else if (route === `home`) {
			this.setState({isSignedIn: true})
		}

		this.setState({route: route});
	}

	render() {
		console.log(this.state);
		const { isSignedIn, imageUrl, route, box } = this.state
		return (
			<div className="App">
				<Particles className="particles"
					params={ particlesOptions }
				/>
				<Navigation onRouteChange={ this.onRouteChange }
					isSignedIn={ isSignedIn } />
				{ route === 'home' ? (
						<div>
							<Rank user={this.state.user} />
							<ImageLinkForm onInputChange={this.onInputChange}
								onSubmit={this.onSubmit}/>
							<FaceRecognition box={box} imageUrl={imageUrl} />
						</div>
					) : (
						route === 'signin'
							? <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
							: <Signup onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
					)
				}
			</div>
		);
	}
}

export default App;
