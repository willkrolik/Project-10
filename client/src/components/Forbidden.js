import React from "react"

export default Forbidden;
// Could be more descriptive 
function Forbidden(props) {
  return (
    <div className="bounds">
    <h1>Forbidden</h1>
    <p>It looks like you don't have permission to access this.</p>
  </div>
  )
}