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
import {addEducation} from "../../actions/profileActions";

class AddEducation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            school: '',
            degree: '',
            fieldOfStudy: '',
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

        const eduData = this.getValuesOfForm(this.state);

        this.props.addEducation(eduData, this.props.history)
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
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="dashboard" className="btn btn-light">
                                Go back
                            </Link>
                            <h1 className="display-4 text-center">Add education</h1>
                            <p className="lead text-center">
                                Add any school, bootcamp, etc
                            </p>
                            <small className="d-block pb-3">* = required fields</small>
                            <form onSubmit={this.onSubmit}>
                                <TextFieldGroup name="school"
                                                placeholder="* School"
                                                value={this.state.school}
                                                error={errors.school}
                                                onChange={this.onChange}/>
                                <TextFieldGroup name="degree"
                                                placeholder="* Degree"
                                                value={this.state.degree}
                                                error={errors.degree}
                                                onChange={this.onChange}/>
                                <TextFieldGroup name="fieldOfStudy"
                                                placeholder="* Filed of Study"
                                                value={this.state.fieldOfStudy}
                                                error={errors.fieldOfStudy}
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
                                    <label htmlFor="current" className="form-check-label">Current Education</label>
                                </div>
                                <TextAreaGroup name="description"
                                               value={this.state.description}
                                               placeholder="Education description"
                                               error={errors.description}
                                               info="Tell us about your education"
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

AddEducation.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {
    addEducation
})(withRouter(AddEducation));