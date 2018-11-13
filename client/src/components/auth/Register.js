import React, {Component} from 'react';
import {connect} from "react-redux";
import {registerUser} from "../../actions/authActions";
import {PropTypes} from 'prop-types';
import {withRouter} from "react-router-dom";
import {
    TextFieldGroup,
} from "../common/index";

class Register extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password2: '',
            errors: {}
        };
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    onSubmit = (e) => {
        e.preventDefault();

        const newUser = {
            ...this.state
        };

        this.props.registerUser(newUser, this.props.history);
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {

        const {
            errors
        } = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your SocialConnector account</p>
                            <form onSubmit={this.onSubmit}>

                                <TextFieldGroup
                                    name="name"
                                    placeholder="Name"
                                    value={this.state.name}
                                    error={errors.name}
                                    onChange={this.onChange}/>

                                <TextFieldGroup
                                    name="email"
                                    placeholder="Email"
                                    value={this.state.email}
                                    error={errors.email}
                                    type="email"
                                    info="
                                    This site uses Gravatar so if you want a
                                        profile image, use a Gravatar email
                                        "
                                    onChange={this.onChange}/>

                                <TextFieldGroup
                                    name="password"
                                    placeholder="Password"
                                    type="password"
                                    value={this.state.password}
                                    error={errors.password}
                                    onChange={this.onChange}/>

                                <TextFieldGroup
                                    name="password2"
                                    placeholder="Confirm password"
                                    type="password"
                                    value={this.state.password2}
                                    error={errors.password2}
                                    onChange={this.onChange}/>

                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(
    mapStateToProps,
    {
        registerUser
    }
)(withRouter(Register));