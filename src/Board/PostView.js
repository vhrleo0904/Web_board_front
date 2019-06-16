import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {inject, observer} from "mobx-react/custom";
import {Redirect} from 'react-router-dom';

@inject('stores')
@observer
class PostView extends Component {

	state = {
		goToList: false,
		goToEdit: false
	};

	componentDidMount() {
		this.props.stores.postStore.fetchItem(this.props.postid);
	}

	render() {
		if(this.state.goToList === true)
			return <Redirect to='/board'/>;

		if(this.state.goToEdit === true)
			return <Redirect to={`/board/edit/${this.props.postid}`} />;

		let p = this.props.stores.postStore;

		if(! p.viewItem)
			return <div/>

		return (
			<div className='board board-view-item'>
				<div>
					제목 : {p.viewItem.title}
				</div>
				<div>
					내용:
					<div className='board-view-item-content'
					     dangerouslySetInnerHTML={{__html:p.viewItem.content}} />
				</div>
				<div>
					작성시간 : {new Date(p.viewItem.created).toLocaleString()}
				</div>
				<div>
					<button><Link to='/'>목록</Link></button> &nbsp;
					<button onClick={this.deletePost}>삭제</button> &nbsp;
					<button onClick={this.editPost}>수정</button>
				</div>
			</div>
		);
	}

	deletePost = async () => {
		if(window.confirm("삭제하시겠습니까?") === false) return;

		if(this.props.stores.profileStore.user === null) {
			alert("로그인 후 사용 가능합니다.");
			return;
		}

		if(this.props.stores.postStore.viewItem.userId !== this.props.stores.profileStore.user.id){
			alert("작성자만 사용 가능합니다.");
			return;
		}

		if(this.props.postid){
			if(await this.props.stores.postStore.deletePost(this.props.postid)){
				await this.props.stores.postStore.fetchItems();
				this.setState({
					goToList : true
				})
			}
		}
	};

	editPost = () =>  {
		if(window.confirm('수정하시겠습니까?') === false) return;

		if(this.props.stores.profileStore.user === null) {
			alert("로그인 후 사용 가능합니다.");
			return;
		}

		if(this.props.stores.postStore.viewItem.userId !== this.props.stores.profileStore.user.id){
			alert("작성자만 사용 가능합니다.");
			return;
		}

		this.setState({goToEdit : true});
	}
}

export default PostView;