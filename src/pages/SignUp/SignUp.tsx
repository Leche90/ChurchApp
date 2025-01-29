import React from 'react'
import './SignUp.css'

const SignUp: React.FC = () => {
  return (
    <div className='form-container'>
        <h2 className='form'>Sign Up Form</h2>
        <form>
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit">Sign Up</button>
        </form>
    </div>
  )
}

export default SignUp