import React from "react"

export default ErrorPage;

function ErrorPage(props) {
    return (
        <div id="root">
        <div>
          <div className="header">
            <div className="bounds">
              <h1 className="header--logo">Courses</h1>
              <nav><a className="signup" href="sign-up.html">Sign Up</a><a className="signin" href="sign-in.html">Sign In</a></nav>
            </div>
          </div>
          <hr />
          <div className="bounds">
            <h1>Error</h1>
            <p>Sorry! We just encountered an unexpected error.</p>
          </div>
        </div>
      </div>);
}