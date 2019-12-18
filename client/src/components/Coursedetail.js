import React, {Component} from 'react';
import {Link} from "react-router-dom";
import ReactMarkdown from 'react-markdown';


 

 // Course Owner Name


export default class CourseDetail extends Component {
  state = {
    course: null,
  };


  const courseOwnerName = `${User.firstName} ${User.lastName}`;

   course data.
 const {
  title,
  description,
  estimatedTime,
  materialsNeeded,
  User
} = props;

  componentDidMount() {
    console.log(this.props);
    this.getCourses();
  }
  
  getCourses = async () => {
    const url = `/courses/${this.props.match.params.id}`;
    try {
      const response = await this.props.context.data.api(url);
      if (response.status === 200) {
        await response.json().then(({course}) => this.setState({course }));
      } else if (response.status === 500) {
        this.props.history.push("/error");
      } else {
        throw new Error();
      }
    } catch (error) {
      console.log(error);
      this.props.history.push("/error");
    }
  };

 
  render() {
    
    return (

      
      <div>
      <hr />
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100"><span><a className="button" href="update-course.html">Update Course</a>
            <a className="button" href="#">Delete Course</a></span>
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
}





























