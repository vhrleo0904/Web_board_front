import {observable, action} from "mobx";
import TimeStore from "./TimeStore";
import axios from 'axios';

class PostStore {

	getSomething = () => TimeStore.getTime();


	static __instance = null;
	static getInstance() {
		if(PostStore.__instance === null)
			PostStore.__instance = new PostStore();
		return PostStore.__instance;
	}
	constructor() {
		PostStore.__instance = this;
	}
	@observable current_time = null;
	@action getTime = async () => {
		this.current_time = await new Date().getTime();
	}

	@observable items = null;
	@action fetchItems = async () => {
		try {
			let response = await axios({
				url: 'http://localhost:8080/api/board',
				method: 'get',
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				},
				timeout: 3000
			});
			if(response.status === 200)
				this.items = response.data;
		} catch(ex) {
			alert(ex.toLocaleString());
		}
	};

	@observable viewItem = null;
	@action fetchItem = async (postid) => {
		try {
			this.viewItem = null;
			let response = await axios({
				url: `http://localhost:8080/get/board/${postid}`,
				method: 'get',
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				},
				timeout: 3000
			});
			if(response.status === 200)
				setTimeout(
					()=>this.viewItem = response.data,
					2000
				);
		} catch(ex) {
			alert(ex.toLocaleString());
		}
	};

	@action addNewPost = async (post) => {
		try {
			let response = await axios({
				url: `http://localhost:8080/add/board`,
				method: 'post',
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				},
				timeout: 3000,
				data: JSON.stringify(post)
			});
			return response.status === 200;
		} catch(ex) {
			alert(ex.toLocaleString());
		}
	};

	@action deletePost = async (postid) => {
		try {
			let response = await axios({
				url: `http://localhost:8080/delete/board/${postid}`,
				method: 'delete',
				timeout: 3000
			});
			return response.status === 200;
		} catch(ex) {
			alert(ex.toLocaleString());
		}
	};

	@action editPost = async (post) => {
		try {
			let response = await axios({
				url: `http://localhost:8080/modify/board`,
				method: 'put',
				headers: {
					'Content-type': 'application/json; charset=UTF-8'
				},
				timeout: 3000,
				data: JSON.stringify(post)
			});
			return response.status === 200;
		} catch(ex) {
			alert(ex.toLocaleString());
		}
	}
}

export default PostStore.getInstance();