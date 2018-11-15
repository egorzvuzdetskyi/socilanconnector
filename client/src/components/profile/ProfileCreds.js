import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import Moment from 'react-moment'
import {
    isEmpty
} from "../../helpers";

class ProfileCreds extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {experience, education} = this.props;
        let expItems,
            eduItems;

        if (experience && experience.length > 0) {
            expItems = experience.map(exp => (
                <li key={exp._id} className="list-group-item">
                    <h4>{exp.company}</h4>
                    <p>
                        <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                        {exp.to === null ? (
                            ' Now'
                        ) : (
                            <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                        )}
                    </p>
                    <p>
                        <strong>Position:</strong> {exp.title}
                    </p>
                    <p>
                        {exp.location === '' ? null : (
                            <span>
              <strong>Location: </strong> {exp.location}
            </span>
                        )}
                    </p>
                    <p>
                        {exp.description === '' ? null : (
                            <span>
              <strong>Description: </strong> {exp.description}
            </span>
                        )}
                    </p>
                </li>
            ));
        }

        if (education && education.length > 0) {
            eduItems = education.map(edu => (
                <li key={edu._id} className="list-group-item">
                    <h4>{edu.school}</h4>
                    <p>
                        <Moment format="YYYY/MM/DD">{edu.from}</Moment> -
                        {edu.to === null ? (
                            ' Now'
                        ) : (
                            <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                        )}
                    </p>
                    <p>
                        <strong>Degree:</strong> {edu.degree}
                    </p>
                    <p>
                        <strong>Field Of Study:</strong> {edu.fieldofstudy}
                    </p>
                    <p>
                        {edu.description === '' ? null : (
                            <span>
              <strong>Description: </strong> {edu.description}
            </span>
                        )}
                    </p>
                </li>
            ));
        }
        return (
            <div className="profileCreds">
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="text-center text-info">Experience</h3>
                        {expItems && expItems.length > 0 ? (
                            <ul className="list-group">{expItems}</ul>
                        ) : (
                            <p className="text-center">No Experience Listed</p>
                        )}
                    </div>

                    <div className="col-md-6">
                        <h3 className="text-center text-info">Education</h3>
                        {eduItems && eduItems.length > 0 ? (
                            <ul className="list-group">{eduItems}</ul>
                        ) : (
                            <p className="text-center">No Education Listed</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileCreds;