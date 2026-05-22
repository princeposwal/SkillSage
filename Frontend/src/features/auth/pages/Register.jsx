//during registration we need username , email, password, but on login we only need email and password.

import {useNavigate,Link} from 'react-router'

const Register = () => {
        //calling navigate funtion to switch between login and register page without refreshing the page.
        useNavigate();
        const handleSubmit = (e) => {
        e.preventDefault();
        // Preventing reload that was happening by defauld when we were pressing submit button.
    }
  return (
    <main>
        <div className="form-container">
            <h1>Register</h1>

            <form onSubmit={handleSubmit}>

            <div className="input-group">
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" placeholder="Enter username"  />
            </div>

            <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Enter email address"  />
            </div>

            <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" placeholder="Enter password"  />
            </div>

            <button class='button primary-button'>Register</button>

            </form>

            <p>Already have an account? <Link to="/login">Login</Link></p>

        </div>
    </main>
   
  )
}

export default Register
