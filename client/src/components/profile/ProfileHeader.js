import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";

class ProfileHeader extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className="profileHeader">

            </div>
        )
    }
}

ProfileHeader.propTypes = {
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps)(withRouter(ProfileHeader));