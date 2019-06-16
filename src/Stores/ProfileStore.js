import {observable, action} from "mobx";
import axios from "axios";

class ProfileStore {
	static __instance = null;

	static getinstance(){
		if(ProfileStore.__instance === null){
			ProfileStore.__instance = new ProfileStore();
		}
		return ProfileStore.__instance;
	}

	constructor(){
		ProfileStore.__instance = this;
	}

	@observable user = null;

	@action login = async (user) => {
		this.user = null;
		try{
			let response = await axios({
				url : `http://localhost:8080/login/users`,
				method : "post",
				headers : {
					'Content-Type' : 'application/json; charset=UTF-8'
				},
				data: JSON.stringify(user),
				timeout : 3000
			});

			if(response.status === 200 && response.data){
				/*await setTimeout(
					()=> this.user_data = response.data,
					3000
				);*/
				this.user = response.data;
				console.log(response.data);
				return true;
			}
			return false;
		}catch (ex) {
			console.log(ex);
			return false;
		}
	}

	@action logout = () => {
		this.user = null;
	}

	@action editUser = async (user) => {
		try{
			let response = await axios({
				url : `http://localhost:8080/modify/users`,
				method : "put",
				headers : {
					'Content-Type' : 'application/json; charset=UTF-8'
				},
				data: JSON.stringify(user),
				timeout : 3000
			});

			if(response.status === 200){
				this.user.account = user.account;
				this.user.email = user.email;
				this.user.username = user.username;
				this.user.password = user.password;

				return true;
			}
			return false;
		}catch (ex) {
			console.log(ex);
			return false;
		}
	}
}

export default ProfileStore.getinstance();