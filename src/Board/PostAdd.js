import React, {Component} from 'react';
import {inject, observer} from "mobx-react/custom";
import {Redirect} from 'react-router-dom';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@inject('stores')
@observer
class PostAdd extends Component {
	state = {
		title: '',
		contentn: '',
		userId: 1,
		goToList: false,
		goToPost: false
	};

	constructor(props) {
		super(props);
		if (this.props.postid && this.props.stores.postStore.viewItem)
			this.state = {
				...this.state,
				title: this.props.stores.postStore.viewItem.title,
				content: this.props.stores.postStore.viewItem.content,
				id: this.props.stores.postStore.viewItem.id,
			}
	}

	render() {
		if(this.state.goToList)
			return <Redirect to='/board'/>

		if (this.state.goToPost)
			return <Redirect to={`/board/view/${this.props.postid}`}/>;

		return (
			<div className='board board-add'>
				<div className='board-add-header'>
					<div>제목</div>
					<div><input value={this.state.title} onChange={this.updateTitle}/></div>
				</div>
				<div>
					내용
					<div>
						<CKEditor editor={ClassicEditor}
						          data={this.state.content}
						          onChange={this.updateContent}
						/>
					</div>
				</div>
				<div>
					<button onClick={this.addNewPost}>확인</button>
				</div>
			</div>
		);
	}

	addNewPost = async () => {
		if(window.confirm('글을 추가(수정)하시겠습니까?') === false) return;

		if (this.props.postid && await this.props.stores.postStore.editPost(this.state)) {
			await this.props.stores.postStore.fetchItems();
			this.setState({
				...this.state,
				goToPost: true
			});
		} else if (await this.props.stores.postStore.addNewPost(this.state)) {
			await this.props.stores.postStore.fetchItems();
			this.setState({
				...this.state,
				goToList: true
			});
		}
	};

	updateTitle = event => {
		this.setState({
			...this.state,
			title: event.target.value
		});
	};

	updateContent = (event, editor) => {
		this.setState({
			...this.state,
			content: editor.getData()
		});
	};
}

export default PostAdd;