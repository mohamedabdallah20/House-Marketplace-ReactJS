import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { toast } from 'react-toastify'
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase.config'
import googleIcon from '../assets/svg/googleIcon.svg'
function OAuth() {
  const Navigate = useNavigate()
  const location = useLocation()
  const onGoogleClick = async () => {
    try {
      const res = await signInWithPopup(getAuth(), new GoogleAuthProvider())

      const docSnap = await getDoc(doc(db, 'users', res.user.uid))

      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', res.user.uid), {
          name: res.user.displayName,
          email: res.user.email,
          timestamp: serverTimestamp(),
        })
      }
      Navigate('/')
    } catch (error) {
      toast.error('could not auth with google')
    }
  }
  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img src={googleIcon} alt="google" className="socialIconImg"></img>
      </button>
    </div>
  )
}

export default OAuth
