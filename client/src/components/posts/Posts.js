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


class Posts extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="feed">
                <div className="container col-md-12">
                    <div className="row">
                        <PostForm/>
                    </div>
                </div>
            </div>
        );
    }
}

Posts.propTypes = {
};

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(Posts);