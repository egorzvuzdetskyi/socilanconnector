import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {
    isEmpty
} from "../../helpers";
import PostForm from "./PostForm";
import {
    Spinner
} from "../common/index";
import {getPosts} from "../../actions/postActions";
import PostFeed from "./PostFeed";


class Posts extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const {
            posts,
            loading
        } = this.props.post;
        let postContent;
        if(posts === null || loading) {
            postContent = <Spinner/>
        } {
            postContent = <PostFeed posts={posts} />
        }

        return (
            <div className="feed">
                <div className="container col-md-12">
                    <div className="row">
                        <PostForm/>
                        {postContent}
                    </div>
                </div>
            </div>
        );
    }
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    post: state.post
});

export default connect(mapStateToProps, {
    getPosts
})(Posts);