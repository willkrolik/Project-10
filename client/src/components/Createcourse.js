import React, {Component} from 'react';
import {} from "react-router-dom";
import Form from "./Form";
import ReactMarkdown from 'react-markdown';

export default class Courses extends Component {

  state = {
    errors: [],
    title: '',
    description: '',
    estimatedTime: '',
    materialsNeeded: ''
  };

  componentDidMount() {
    console.log(this.props);
    this.getCourses();}



  render() {
    
    const {

      context
    } = this.props;
  
    const {
      errors,
      title,
      description,
      estimatedTime,
      materialsNeeded,
    } = this.state;

    const authUser = context.authenticatedUser;
    const courseOwnerName = authUser ? `${authUser.firstName} ${authUser.lastName}` : "No User Signed In"
    const user = this.context.user;
console.log(user);
    return (

        <div className="bounds course--detail">
          <h1>Create Course</h1>
          <div>
            <ul className="validation--errors--label">
              {
                errors
                    ? errors.map(error => <li key={error}>{error}</li>)
                    : ''
              }
            </ul>

            <Form
                cancel={this.cancel}
                submit={this.submit}
                submitButtonText="Create Course"
                elements={() => (
                    <div>
                      <div className="grid-66">
                        <div className="course--header">
                          <h4 className="course--label">Course</h4>
                          <React.Fragment>
                            <input id="title"
                                   name="title"
                                   type="text"
                                   className="input-title"
                                   placeholder="Title..."
                                   value={title}
                                   onChange={this.change}/>
                          </React.Fragment>
                          <p>By {courseOwnerName}</p>
                          <div className="course--description">
                            <React.Fragment>
                          <textarea id="description"
                                    name="description"
                                    type="text"
                                    placeholder="Course description..."
                                    value={description}
                                    onChange={this.change}/>
                            </React.Fragment>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="grid-25 grid-right">
                          <div className="course--stats">
                            <ul className="course--stats--list">
                              <li key="Estimated Time">
                                <h4>Estimated Time</h4>
                                <div>
                                  <React.Fragment>
                                    <input
                                        id="estimatedTime"
                                        name="estimatedTime"
                                        type="text"
                                        className="course--time--input"
                                        placeholder="Hours"
                                        value={estimatedTime}
                                        onChange={this.change}/>
                                  </React.Fragment>
                                </div>
                              </li>
                              <li key="Materials">
                                <h4>Materials Needed</h4>
                                <div>
                                    <textarea
                                        id="materialsNeeded"
                                        name="materialsNeeded"
                                        placeholder="List materials..."
                                        value={materialsNeeded}
                                        onChange={this.change}
                                    />
                                </div>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                )}/>

          </div>
        </div>
    );
  }

  change = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    this.setState(() => {
      return {
        [name]: value
      };
    });
  };

  submit = async () => {
    const {context} = this.props;
    const authUser = context.authenticatedUser;
    const {emailAddress} = authUser;
    const password = context.userPassword;
    const userId = this.props.authUser.id;

    const {
      errors,
      title,
      description,
      estimatedTime,
      materialsNeeded,

    } = this.state;

    const course = {
      title: title,
      description: description,
      estimatedTime,
      materialsNeeded,
      errors
    };

    let response = await context.data.createCourse(course, {emailAddress, password, userId});
    if (response.status === 201) {
      this.props.history.push('/courses');
    } else if (response.status === 400) {
      response.json()
          .then(data =>
              Promise.resolve(this.setState({
                errors: data.errors
              })));
    }
  };

  cancel = () => {
    this.props.history.push('/');
  };

};


{/*
export default Coursedetail;
function Coursedetail(props) {
  return (

<div className="bounds course--detail">
<h1>Create Course</h1>
<div>
  <div>
    <h2 className="validation--errors--label">Validation errors</h2>
    <div className="validation-errors">
      <ul>
        <li>Please provide a value for "Title"</li>
        <li>Please provide a value for "Description"</li>
      </ul>
    </div>
  </div>
  <form>
    <div className="grid-66">
      <div className="course--header">
        <h4 className="course--label">Course</h4>
        <div><input id="title" name="title" type="text" className="input-title course--title--input" placeholder="Course title..." defaultValue /></div>
        <p>By Joe Smith</p>
      </div>
      <div className="course--description">
        <div><textarea id="description" name="description" className placeholder="Course description..." defaultValue={""} /></div>
      </div>
    </div>
    <div className="grid-25 grid-right">
      <div className="course--stats">
        <ul className="course--stats--list">
          <li className="course--stats--list--item">
            <h4>Estimated Time</h4>
            <div><input id="estimatedTime" name="estimatedTime" type="text" className="course--time--input" placeholder="Hours" defaultValue /></div>
          </li>
          <li className="course--stats--list--item">
            <h4>Materials Needed</h4>
            <div><textarea id="materialsNeeded" name="materialsNeeded" className placeholder="List materials..." defaultValue={""} /></div>
          </li>
        </ul>
      </div>
    </div>
    <div className="grid-100 pad-bottom"><button className="button" type="submit">Create Course</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button></div>
  </form>
</div>
</div>
    );
  }

*/}