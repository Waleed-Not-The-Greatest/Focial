import React from 'react';
import { Icon } from 'semantic-ui-react';

import { Link } from 'react-router-dom';

const PostComments = props => {
  const renderComments = () => {
    return props.comments.map(comment => {
      return (
        <div className="comment" key={comment._id}>
          <Icon name="user" size="large" />
          <div className="comment_text">
            <Link to="!#" style={{ color: '#008ecc', marginRight: '5px' }}>
              {comment.author_name}
            </Link>
            {comment.content}
          </div>
        </div>
      );
    });
  };
  return renderComments();
};

export default PostComments;