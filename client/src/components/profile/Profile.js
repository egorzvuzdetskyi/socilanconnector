import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import Spinner from "../common/index";
import {
    getProfileByHandle
} from '../../actions/profileActions';

class Profile extends Component {

    componentDidMount() {
        const handle = this.props.match.params.handle
        if(handle) {
            this.props.getProfileByHandle(handle)
        }
    }

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

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {
    getProfileByHandle
})(withRouter(Profile));