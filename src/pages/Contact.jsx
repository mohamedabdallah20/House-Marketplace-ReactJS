import React, { useState } from 'react'
import { useFetchUser } from '../hooks/useFetchUser'
import { useParams, useSearchParams } from 'react-router-dom'
import Spinner from '../components/layout/Spinner'

function Contact() {
  const userId = useParams().landlordId
  const [message, setMessage] = useState('')
  const [searchPrams, setSearchPrams] = useSearchParams()
  const { user, loading } = useFetchUser(userId)

  const onChange = (e) => {
    setMessage(e.target.value)
  }

  if (loading) return <Spinner />
  return (
    <div className="pageContainer">
      <header>
        <p className="pageHeader"> Contact Landlord</p>
      </header>
      {user && (
        <main>
          <div className="contactLandlord">
            <p className="landlordName">Contact : {user?.name}</p>
          </div>
          <form className="messageForm">
            <div className="messageDiv">
              <label htmlFor="message" className="messageLabel">
                Message
              </label>
              <textarea
                name="message"
                id="message"
                className="textarea"
                value={message}
                onChange={onChange}
              ></textarea>
            </div>
            <a
              href={`mailto:${user.email}?Subject=${searchPrams.get(
                'listingName'
              )}&body=${message}`}
            >
              <button type="button" className="primaryButton">
                Send message
              </button>
            </a>
          </form>
        </main>
      )}
    </div>
  )
}

export default Contact
