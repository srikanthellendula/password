import {Component} from 'react'
import {v4} from 'uuid'
import PasswordsList from '../PasswordsList'
 

class Passwords extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    passwords: [],
    showPasswords: false,
    count: 0,
    search: '',
  }

  onSubmitClicked = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newItem = {
      id: v4(),
      website,
      username,
      password,
    }
    if (website !== '' && username !== '' && password !== '') {
      this.setState(prevState => ({
        passwords: [...prevState.passwords, newItem],
        website: '',
        username: '',
        password: '',
      }))
      this.setState(prevState => ({count: prevState.passwords.length}))
    }
  }

  onEnterSite = event => {
    this.setState({website: event.target.value})
  }

  onEnterUsername = event => {
    this.setState({username: event.target.value})
  }

  onEnterPassword = event => {
    this.setState({password: event.target.value})
  }

  onSelectCheckBox = () => {
    this.setState(prevState => ({showPasswords: !prevState.showPasswords}))
  }

  toDelItem = id => {
    const {passwords} = this.state
    const filteredList = passwords.filter(eachItem => eachItem.id !== id)
    this.setState({passwords: filteredList})
    this.setState(prevState => ({count: prevState.passwords.length}))
  }

  onUserSearch = event => {
    this.setState({search: event.target.value})
  }

  render() {
    const {
      passwords,
      website,
      username,
      password,
      showPasswords,
      count,
      search,
    } = this.state

    const searchResultList = passwords.filter(eachItem =>
      eachItem.website.toLowerCase().includes(search.toLowerCase()),
    )

    const searchCount = searchResultList.length

    const countZero = (
      <div className="no-pass-cont">
        <img
          className="no-password-img"
          src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
          alt="no passwords"
        />
        <p>No Passwords </p>
      </div>
    )

    return (
      <div className="bg-cont">
        <img
          className="main-icon"
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
        />
        <div className="to-create">
          <div className="add-new-password">
            <h1> Add New Password </h1>
            <form className="form" onSubmit={this.onSubmitClicked}>
              <div className="icon-cont">
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png "
                  alt="website"
                />
                <input
                  type="text"
                  value={website}
                  placeholder="Enter Website"
                  onChange={this.onEnterSite}
                />
              </div>

              <div className="icon-cont">
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png "
                  alt="username"
                />{' '}
                <input
                  type="text"
                  value={username}
                  placeholder="Enter Username"
                  onChange={this.onEnterUsername}
                />
              </div>
              <div className="icon-cont">
                <img
                  className="icon"
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                />
                <input
                  type="password"
                  value={password}
                  placeholder="Enter Password"
                  onChange={this.onEnterPassword}
                />
              </div>
              <div className="btn-cont">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </form>
          </div>
          <div>
            <img
              className="create-image"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
            />{' '}
          </div>
        </div>
        <div className="created">
          <div className="search-cont">
            <div>
              <h1> Your Passwords </h1>
              {search === '' ? <p>{count}</p> : <p>{searchCount}</p>}
            </div>
            <div className="icon-cont">
              <img
                className="icon"
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png "
                alt="search"
              />
              <input
                type="search"
                value={search}
                onChange={this.onUserSearch}
              />
            </div>
          </div>
          <hr className="hr" />
          <div className="show-passwords">
            <input
              id="checkbox"
              type="checkbox"
              onClick={this.onSelectCheckBox}
            />
            <label htmlFor="checkbox"> Show Passwords</label>
          </div>
          {count === 0 || searchCount === 0 ? (
            countZero
          ) : (
            <ul className="list-style">
              {search === ''
                ? passwords.map(eachItem => (
                    <PasswordsList
                      passwordsEntered={eachItem}
                      key={eachItem.id}
                      showPasswords={showPasswords}
                      toDelItem={this.toDelItem}
                    />
                  ))
                : searchResultList.map(eachItem => (
                    <PasswordsList
                      passwordsEntered={eachItem}
                      key={eachItem.id}
                      showPasswords={showPasswords}
                      toDelItem={this.toDelItem}
                    />
                  ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Passwords
