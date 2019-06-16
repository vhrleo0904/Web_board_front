import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class Login extends Component {
	componentDidMount() {

	}

	state = {
		account: '',
		password: '',
		goToProfile: false
	};

	render() {
		if (this.state.goToProfile)
			return <Redirect to='/user'/>;

		return (
			<div className='login_container'>
				<div className='login_element_container'>
					<div ><input value={this.state.account} placeholder='ID'  onChange={this.updateAccount}/></div>
					<div><input value={this.state.password} placeholder='Password' type="password" onChange={this.updatePassword}/></div>
					<div><button onClick={this.loginUser}>로그인</button></div>
				</div>
			</div>
		);
	}

	loginUser = async () => {
		if(await this.props.stores.profileStore.login(this.state) === true) {
			await this.setState({
				...this.state,
				goToProfile: true
			});
		}
		else {
			await this.setState({
				...this.state,
				password: ''
			});
			alert("로그인 실패");
		}
	};
	updateAccount = event => {
		this.setState( {
			...this.state,
			account: event.target.value
		})
	};
	updatePassword = event => {
		this.setState( {
			...this.state,
			password: event.target.value
		})
	};
}

export default Login;