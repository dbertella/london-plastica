import React, { MouseEvent } from 'react'
import { Link } from 'gatsby'
import netlifyIdentity from 'netlify-identity-widget'

const Navbar = class extends React.Component {
  componentDidMount() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0
    )
    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target
          const $target = document.getElementById(target)
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active')
          $target!.classList.toggle('is-active')
        })
      })
    }
  }
  handleIdentity = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    netlifyIdentity.open()
  }
  render() {
    return (
      <nav
        className="navbar is-transparent"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" title="Logo">
              London Plastica
            </Link>

            <div className="navbar-burger burger" data-target="navMenu">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-end has-text-centered">
              <button onClick={this.handleIdentity}>Login</button>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
export default Navbar
