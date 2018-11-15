import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";

class ProfileCreds extends Component {

    constructor(props) {
        super(props);
    }

    render() {



        return (
            <div className="profileCreds">

            </div>
        )
    }
}

ProfileCreds.propTypes = {
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps)(withRouter(ProfileCreds));