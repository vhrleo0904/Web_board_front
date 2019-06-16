import React, {Component} from 'react'
import {inject, observer} from "mobx-react";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class UserEdit extends Component {
	state = {
		goToProfile : false,
		account : this.props.stores.profileStore.user.account,
		username : this.props.stores.profileStore.user.username,
		password : this.props.stores.profileStore.user.password,
		email : this.props.stores.profileStore.user.email,
		id : this.props.stores.profileStore.user.id
	};

	render() {
		if(this.state.goToProfile){
			return <Redirect to='/user' />;
		}
		return(
			<div className='edit_container'>
				<div className='edit_element_container'>
					<div>아이디 : <input value={this.state.account} placeholder='아이디'  onChange={this.updateAccount}/></div>
					<div>이름 : <input value={this.state.username} placeholder='이름'  onChange={this.updateUsername}/></div>
					<div>이메일 : <input value={this.state.email} placeholder='이메일'  onChange={this.updateEmail}/></div>
					<div>비밀번호 : <input value={this.state.password} placeholder='비밀번호' onChange={this.updatePassword} type='password'/></div>
					<div>
						<button onClick={this.editUser}>수정</button><button onClick={this.cancle}>취소</button>
					</div>
					</div>
			</div>
		)
	}

	updateAccount = (event) => {
		this.setState( {
			...this.state,
			account: event.target.value
		})
	}

	updateUsername = (event) => {
		this.setState( {
			...this.state,
			username: event.target.value
		})
	}

	updateEmail = (event) => {
		this.setState( {
			...this.state,
			email: event.target.value
		})
	}

	updatePassword = (event) => {
		this.setState( {
			...this.state,
			password: event.target.value
		})
	}

	editUser = async () => {
		if(window.confirm("수정하시겠습니까?") === false) return;

		if(await this.props.stores.profileStore.editUser(this.state)){
			this.setState({
				goToProfile:true
			})
		} else {
			this.setState({
				goToProfile:false
			})
			alert("수정에 실패하였습니다.");
		}
	}

	cancle = () => {
		this.setState({
			goToProfile : true
		})
	}
}

export default UserEdit;