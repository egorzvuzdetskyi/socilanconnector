import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";

class ProfileAbout extends Component {

    constructor(props) {
        super(props);
    }

    render() {



        return (
            <div className="profileAbout">

            </div>
        )
    }
}

ProfileAbout.propTypes = {
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps)(withRouter(ProfileAbout));