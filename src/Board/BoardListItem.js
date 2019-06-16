import React from 'react';
import {Link} from 'react-router-dom';

const BoardListItem = (props) => {
	let {post} = props;
	let created = new Date(props.post.created);
	let viewPost = `/board/view/${post.id}`;
	return (
		<div className='board-list-item' onClick={()=>5}>
			<div>
				<Link to={viewPost}>
				{post.title}
				</Link>
			</div>
			<div>{post.username}</div>
			<div>
				{created.getMonth() + 1}-{created.getDate()}
				&nbsp;
				{created.getHours()}:{created.getMinutes()}
			</div>
		</div>
	);
};

export default BoardListItem;