import React, {
    Component
} from 'react';
import {Link, withRouter} from "react-router-dom";
import {
    TextFieldGroup,
    TextAreaGroup
} from "../common/index";
import {connect} from "react-redux";
import PropTypes from 'prop-types';
import {addExperience} from "../../actions/profileActions";

class AddExperience extends Component {
    constructor(props) {
        super(props);

        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        }
    };

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    onSubmit = (e) => {
        e.preventDefault();

        const expData = this.getValuesOfForm(this.state);

        this.props.addExperience(expData, this.props.history)
    };

    componentWillReceiveProps = (nextProps) => {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            });
        }
    };

    getValuesOfForm = (state) => {

        const result = {};

        Object.keys(state).forEach(key => {
            if (key === 'disabled' || key === 'errors') return;

            result[key] = state[key]
        });

        return result;
    };

    onCheck = (e) => {
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current
        })
    };

    render() {

        const {
            errors
        } = this.state;

        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="dashboard" className="btn btn-light">
                                Go back
                            </Link>
                            <h1 className="display-4 text-center">Add experience</h1>
                            <p className="lead text-center">
                                Add any job or position that you have had in the past or current
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup name="company"
                                                placeholder="* Company"
                                                value={this.state.company}
                                                error={errors.company}
                                                onChange={this.onChange}/>
                                <TextFieldGroup name="title"
                                                placeholder="* Job title"
                                                value={this.state.title}
                                                error={errors.title}
                                                onChange={this.onChange}/>
                                <TextFieldGroup name="location"
                                                placeholder="Location"
                                                value={this.state.location}
                                                error={errors.location}
                                                onChange={this.onChange}/>
                                <h6>From Date</h6>
                                <TextFieldGroup name="from"
                                                type="date"
                                                value={this.state.from}
                                                error={errors.from}
                                                onChange={this.onChange}/>
                                <h6>To Date</h6>
                                <TextFieldGroup name="to"
                                                type="date"
                                                value={this.state.to}
                                                error={errors.to}
                                                disabled={this.state.disabled ? 'disabled' : ''}
                                                onChange={this.onChange}/>
                                <div className="form-check mb-4">
                                    <input type="checkbox"
                                           name="current"
                                           value={this.state.current}
                                           checked={this.state.current}
                                           onChange={this.onCheck}
                                           id="current"
                                           className="form-check-input"/>
                                    <label htmlFor="current" className="form-check-label">Current Job</label>
                                </div>
                                <TextAreaGroup name="description"
                                               value={this.state.description}
                                               placeholder="Job description"
                                               error={errors.description}
                                               info="Tell us about the position"
                                               onChange={this.onChange}/>
                                <input type="submit" value="Submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {
    addExperience
})(withRouter(AddExperience));