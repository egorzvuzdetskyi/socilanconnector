import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CommentItem from "./CommentItem";


class CommentFeed extends Component{

    render() {

        const {
            comments,
            postId
        } = this.props;

        if(!(comments && comments.length > 0)) {
            return (
                <div>
                    <p>
                        No comments yet. Be the first one!
                    </p>
                </div>
            )
        }

        return comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} postId={postId}/>
        ));
    }
}

CommentFeed.propTypes = {
    comments: PropTypes.array.isqRequired,
    postId: PropTypes.string.isRequired
}

export default CommentFeed;