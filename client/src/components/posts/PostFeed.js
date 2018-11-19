import React, {Component} from 'react';
import PropTypes from 'prop-types';
import PostItem from "./PostItem";

class PostFeed extends Component {

    render() {

        const {
            posts
        } = this.props;

        if (!(posts && posts.length > 0)) {
            return (
                <div>
                    No posts yet
                </div>
            )
        }

        return posts.map(post => <PostItem key={post._id} post={post}/>)
    }

}

PostFeed.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostFeed