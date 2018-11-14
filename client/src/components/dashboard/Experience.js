import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";
import Moment from 'react-moment'
import {
    deleteExperience
} from '../../actions/profileActions';

class Experience extends Component {

    constructor(props){
        super(props);
    }

    onDeleteClick = (id) => {
        this.props.deleteExperience(id, this.props.history);
    };

    getViewForTable = (experience) => {
        const result = experience.map(exp => (
            <tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> -
                    {exp.to === null ? (' Now') : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
                </td>
                <td><button onClick={this.onDeleteClick.bind(null, exp._id)} className="btn btn-danger">Delete</button></td>
            </tr>
        ));

        return result
    }

    render() {

        let experience;

        if(this.props.experience.length > 0) experience = this.getViewForTable(this.props.experience);

        return(
            <div>
                <h4 className="mb-4">Experience Credentials</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Title</th>
                            <th>Years</th>
                            <th></th>
                        </tr>
                    {experience}
                    </thead>
                </table>
            </div>
        )
    }
}

Experience.propTypes = {
    deleteExperience: PropTypes.func.isRequired
};

export default connect(null, {
    deleteExperience
})(withRouter(Experience));