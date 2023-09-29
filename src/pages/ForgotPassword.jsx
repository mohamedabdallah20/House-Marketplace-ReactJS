import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'
import { toast } from 'react-toastify'
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      await sendPasswordResetEmail(getAuth(), email)
      toast.success('Reset Link Sent to you!')
      navigate('/sign-in')
    } catch (error) {
      toast.error('could not send reset link')
    }
  }
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader">Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={email}
            placeholder="Email"
            className="emailInput"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Link to="/sign-up" className="forgotPasswordLink">
            Sign UP
          </Link>
          <div className="signInBar">
            <div className="signInText">Send Reset Link</div>
            <button className="signInButton">
              <ArrowRightIcon
                fill="#ffffff"
                width={34}
                height={34}
              ></ArrowRightIcon>
            </button>
          </div>
        </form>
      </main>
    </div>
  )
}

export default ForgotPassword
