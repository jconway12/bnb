import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {logout} from '../../actions/session_actions';
import NavBarDropdown from './nav_bar_dropdown';
import { openModal } from '../../actions/modal_actions';


class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = { dropDown: false }
    this.dropDown = this.dropDown.bind(this);
  }

  dropDown() {
    if (!this.state.dropDown) {
    this.setState({dropDown: true});
    } else {
      this.setState({ dropDown: false });
    }
  }

  render() {
    // debugger
    if (this.props.currentUser) {
      let navDropDown = null;
        if (this.state.dropDown) {
          navDropDown = <NavBarDropdown logout={this.props.logout} user={this.props.currentUser}/>
        }
      return (
        <div id='nav-bar'>
          <div id='logo'>
            <img src={window.logoURL} />
          </div>
          <Link className="nav-item" to="">Become a Host</Link>
          <Link className="nav-item" to="">Saved</Link>
          <Link className="nav-item" to="">Trips</Link>
          <Link className="nav-item" to="">Messages</Link>
          <Link className="nav-item" to="">Help</Link>
          <div className="nav-item" id="prof-img" onClick={this.dropDown}>{this.props.currentUser.first_name}</div>
          {navDropDown}
        </div>
      )
    } else {
      return (
        <div id='nav-bar'>
          <div id='logo'>
            <img src="../../../app/assets/images/main.jpg" alt="" />
        </div>
          <Link className="nav-item" to="">Host a home</Link>
          <Link className="nav-item" to="">Host an experience</Link>
          <Link className="nav-item" to="">Help</Link>

          {/* <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link> */}

          <nav className="login-signup">
            <input className="nav-item" type="submit" value="Log In" onClick={() => this.props.openModal('login')} />
            <input className="nav-item" type="submit" value="Sign Up" onClick={() => this.props.openModal('signup')} />
          </nav>
        </div>
      )
    }
  }
}

const msp = state => {
  // // debugger
  const currentUserId = state.session.id;
  const currentUser = state.entities.users[currentUserId];
  return {
    currentUser
  }
}

const mdp = dispatch => {
  return {
    logout: () => dispatch(logout()),
    openModal: modal => dispatch(openModal(modal))
  }
}

export default connect(msp, mdp)(NavBar);



