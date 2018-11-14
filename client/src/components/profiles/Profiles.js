import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import {
    Spinner
} from "../common/index";
import {
    getProfiles
} from '../../actions/profileActions'

class Profiles extends Component {

    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.props.getProfiles();
    }

    render() {

        const {
            profiles,
            loading
        } = this.props.profile;
        let profileItems;

        if(profiles === null || loading){
            profileItems = <Spinner/>
        } else {
            if(profiles.length > 0) {
                profileItems = <h1>Profiles here</h1>
            } else {
                profileItems = <h4>No profiles found...</h4>
            }
        }

        return(
            <div className="profiles">
                <div className="container">
                    <div className="row">
                        <col-md-12>
                            <h1 className="display-4 text-center">
                                People profiles
                            </h1>
                            <p className="lead text-center">
                                Browse and connect with people
                            </p>
                            {profileItems}
                        </col-md-12>
                    </div>
                </div>
            </div>
        )
    }
}

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
})

export default connect(mapStateToProps, {
    getProfiles
})(withRouter(Profiles));