import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import Board from '../Board';

@inject('stores')
@observer
class Home extends Component {

	state = {
		value: 1
	};

	render() {
		return (
			<Board />
		);
	}
}

export default Home;