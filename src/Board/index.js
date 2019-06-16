import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';

import BoardList from './BoardList';
import './Board.scss'
import PostView from "./PostView";
import PostAdd from "../Board/PostAdd";

@inject('stores')
@observer
class Board extends Component {

	componentDidMount() {
		this.props.stores.postStore.fetchItems();
		console.log(this.props);
	}

	render() {
		if(this.props.match && this.props.match.params.command === 'view')
			return <PostView postid={this.props.match.params.postid}/>;

		if(this.props.match && this.props.match.params.command === 'add')
			return <PostAdd />;

		if(this.props.match && this.props.match.params.command === 'edit')
			return <PostAdd postid={this.props.match.params.postid} />;

		let p = this.props.stores.postStore;

		return (
			<div>
				{p.items && <BoardList items={p.items} />}
			</div>
		);
	}
}

export default Board;