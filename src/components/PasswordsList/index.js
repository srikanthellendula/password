const PasswordsList = props => {
  const {passwordsEntered, showPasswords, toDelItem, count} = props
  const {id} = passwordsEntered
  console.log(count)

  const onDelete = () => {
    toDelItem(id)
  }

  const havingPasswords = (
    <li>
      <div className="list-cont">
        <div>
          <h1> {passwordsEntered.website[0]}</h1>
        </div>
        <div>
          <p> {passwordsEntered.website}</p>
          <p> {passwordsEntered.username}</p>
          {showPasswords ? (
            <p> {passwordsEntered.password}</p>
          ) : (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              alt="stars"
            />
          )}
        </div>
        <div>
          <button
            type="button"
            className="button"
            onClick={onDelete}
            data-testid="delete"
          >
            <img
              className="del-icon"
              src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
              alt="delete"
            />
          </button>
        </div>
      </div>
    </li>
  )

  return <div> {havingPasswords}</div>
}

export default PasswordsList
