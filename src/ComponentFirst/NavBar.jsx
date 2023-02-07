import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {

  return (
    <div>
      <h1>SSS</h1>

      <form class="navbar-form navbar-left" role="search">
        <div class="form-group">
          <input type="text" class="form-control" placeholder="Search" />
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>
    </div>
  );
}

export default NavBar;



