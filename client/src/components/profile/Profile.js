import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import ProfileAbout from "./ProfileAbout";
import ProfileCreds from "./ProfileCreds";
import {
    Spinner
} from "../common/index";
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
        const {
            profile,
            loading
        } = this.props.profile;
        let profileContent = null;
        if(profile === null || loading) {
            profileContent = <Spinner/>
        } else {
            profileContent = (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/profiles" className="btn btn-light mb-3 float-left">
                                Back to profiles
                            </Link>
                        </div>
                    </div>
                    <ProfileHeader profile={profile} />
                    <ProfileAbout profile={profile}/>
                    <ProfileCreds profile={profile}/>
                </div>
            )
        }


        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div>
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