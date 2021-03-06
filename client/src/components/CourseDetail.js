import React, { Component } from "react";
import { Link } from "react-router-dom";
import ReactMarkdown from 'react-markdown';

// Course Owner Name
export default class CourseDetail extends Component {
  state = {
    course: null,
  };
  componentDidMount() {
    this.getCourses();
  }
  //dynamically pulls thecourse detail, will pass back forbidden if the user does not own the course
  getCourses = async () => {
    const url = `/courses/${this.props.match.params.id}`;
    try {
      const response = await this.props.context.data.api(url);
      if (response.status === 200) {
        await response.json().then(({ course }) => this.setState({ course }));

      } else if (response.status === 403) {
        this.props.history.push("/Forbidden");
      } else if (response.status === 500) {
        this.props.history.push("/error");
      } else {
        throw new Error();
      }
    } catch (error) {
      this.props.history.push("/error");
    }
  }
  render() {
    let userId, title, description, estimatedTime, materialsNeeded
    if (this.state.course) {

      // put user validation here



      ({
        userId,
        title,
        description,
        estimatedTime,
        materialsNeeded
      } = this.state.course);
    }
    const {
      context
    } = this.props;
    // renders the page, ideally, update and delete only exist for the course owner
    const authUser = context.authenticatedUser;
    console.log('course', title);
    const courseOwnerName = authUser ? `${authUser.firstName} ${authUser.lastName}` : "No User Signed In"
    return (
      <div>
        <hr />
        <div>
          <div className="actions--bar">
            <div className="bounds">

              <div className="grid-100">

                {authUser && authUser.id === userId && <span>
                  <Link className="button" to={`/courses/${this.props.match.params.id}/update`}>Update Course</Link>
                  <Link className="button" onClick={this.deleteCourse} to='/courses/delete'>Delete Course</Link>
                </span>}

                <Link className="button button-secondary" to="/">Return to List</Link>
              </div>
            </div>
          </div>
          <div className="bounds course--detail">
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Course</h4>
                <h3 className="course--title">{title}</h3>
                <p>By {courseOwnerName}</p>
              </div>
              <div className="course--description">
                <ReactMarkdown source={description} />
              </div>
            </div>
            <div className="grid-25 grid-right">
              <div className="course--stats">
                <ul className="course--stats--list">
                  <li className="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <h3>{estimatedTime}</h3>
                  </li>
                  <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ul>
                      <ReactMarkdown source={materialsNeeded} />
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // it made sense for the delete method to live in the details component
  deleteCourse = async () => {
    const url = `/courses/${this.props.match.params.id}`;
    try {
      const response = await this.props.context.data.api(url, 'DELETE', this.state.course, true, this.props.context.authenticatedUser);
      if (response.status === 204) {
        this.props.history.push("/")
      } else if (response.status === 403) {
        this.props.history.push("/Forbidden");
      } else if (response.status === 500) {
        this.props.history.push("/error");
      } else {
        throw new Error();
      }
    } catch (error) {
      this.props.history.push("/error");
    }
  }




}





























