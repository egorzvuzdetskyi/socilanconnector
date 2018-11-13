import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from "react-redux";
import {
    TextFieldGroup,
    SelectListGroup,
    InputGroup,
    TextAreaGroup
} from "../common/index";
import {createOrUpdateProfile} from "../../actions/profileActions";
import {withRouter} from "react-router-dom";

class CreateProfile extends Component {

    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            githubUsername: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {}
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();

        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubUsername: this.state.githubUsername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram,
        };

        this.props.createOrUpdateProfile(profileData, this.props.history);
    };

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    render() {

        const {
                errors,
                displaySocialInputs
            } = this.state,
            options = [
                {
                    label: '* Select Professional Status',
                    value: 0
                },
                {
                    label: 'Developer',
                    value: 'Developer'
                }
                // need to finish this list. just do not what to put here. lul
            ];

        let socialInputs;

        if(displaySocialInputs) {
            socialInputs = (
                <div>
                    <InputGroup
                        name="twitter"
                        value={this.state.twitter}
                        placeholder="Twitter profile URL"
                        onChange={this.onChange}
                        icon="fab fa-twitter"
                        error={errors.twitter}
                        />

                    <InputGroup
                        name="facebook"
                        value={this.state.facebook}
                        placeholder="Facebook profile URL"
                        onChange={this.onChange}
                        icon="fab fa-facebook"
                        error={errors.youtube}
                    />

                    <InputGroup
                        name="youtube"
                        value={this.state.youtube}
                        placeholder="Youtube profile URL"
                        onChange={this.onChange}
                        icon="fab fa-youtube"
                        error={errors.youtube}
                    />

                    <InputGroup
                        name="linkedin"
                        value={this.state.linkedin}
                        placeholder="Linkedin profile URL"
                        onChange={this.onChange}
                        icon="fab fa-linkedin"
                        error={errors.linkedin}
                    />

                    <InputGroup
                        name="instagram"
                        value={this.state.instagram}
                        placeholder="Instagram profile URL"
                        onChange={this.onChange}
                        icon="fab fa-instagram"
                        error={errors.instagram}
                    />
                </div>
            )
        } else socialInputs = null;

        return (
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">
                                Create Your Profile
                            </h1>
                            <p className="lead text-center">
                                Let's get some information to make your profile stand out
                            </p>
                            <small className="d-block pb-3">
                                * = required field
                            </small>
                            <form onSubmit={this.onSubmit}>

                                <TextFieldGroup
                                    placeholder="Profile Handle*"
                                    name="handle"
                                    value={this.state.handle}
                                    error={errors.handle}
                                    info="A unique username."
                                    onChange={this.onChange}/>

                                <SelectListGroup name='status'
                                                 placeholder='Status'
                                                 value={this.state.status}
                                                 onChange={this.onChange}
                                                 error={errors.status}
                                                 info="Give us an idea of where you are at in your career"
                                                 options={options}/>

                                <TextFieldGroup
                                    placeholder="Company"
                                    name="company"
                                    value={this.state.company}
                                    error={errors.company}
                                    info="Company you work for."
                                    onChange={this.onChange}/>

                                <TextFieldGroup
                                    placeholder="Web site"
                                    name="website"
                                    value={this.state.website}
                                    error={errors.website}
                                    info="Your website or a company one"
                                    onChange={this.onChange}/>

                                <TextFieldGroup
                                    placeholder="Location"
                                    name="location"
                                    value={this.state.location}
                                    error={errors.location}
                                    info="City and country where u living are. (eg. Kiev, UA)"
                                    onChange={this.onChange}/>

                                <TextFieldGroup
                                    placeholder="Skills"
                                    name="skills"
                                    value={this.state.skills}
                                    error={errors.skills}
                                    info="Your skills or where you are feel good in. Use a comma separated for multiple variants (eg. Cooking,Joking)"
                                    onChange={this.onChange}/>

                                <TextAreaGroup
                                    placeholder="Short bio"
                                    name="bio"
                                    value={this.state.bio}
                                    error={errors.bio}
                                    info="Tell us a little about yourself"
                                    onChange={this.onChange}/>

                                <div className="mb-3">
                                    <button
                                        onClick={() => {
                                            this.setState(prevState => ({
                                                displaySocialInputs: !prevState.displaySocialInputs
                                            }))
                                        }}
                                        type="button"
                                        className="btn btn-light">
                                        Add social network links
                                    </button>
                                    <span className="text-muted">Optional</span>
                                </div>
                                {socialInputs}
                                <input
                                    type="submit"
                                    value="Submit"
                                    className="btn btn-in btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}


CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    createOrUpdateProfile: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    errors: state.errors,
    profile: state.profile
});

export default connect(mapStateToProps, { createOrUpdateProfile })(
    withRouter(CreateProfile)
);