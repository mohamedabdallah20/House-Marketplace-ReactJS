import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, updateProfile } from 'firebase/auth'
import { db } from '../firebase.config'
import {
  doc,
  updateDoc,
  collection,
  query,
  getDocs,
  where,
  orderBy,
  deleteDoc,
} from 'firebase/firestore'
import { toast } from 'react-toastify'
import aroowKeyIcon from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import ListingItem from '../components/ListingItem'

function Profile() {
  const auth = getAuth()
  const navigate = useNavigate()
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLstings = async () => {
      const colRef = collection(db, 'listings')
      const q = query(
        colRef,
        where('userRef', '==', auth.currentUser.uid),
        orderBy('timestamp', 'desc')
      )
      const querySnap = await getDocs(q)
      const listing = []
      querySnap.forEach((doc) => {
        return listing.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      setListings(listing)
      setLoading(false)
    }
    fetchLstings()
  }, [auth.currentUser.uid])
  const [changeDetails, setChangeDetails] = useState(false)
  const [formData, setFormData] = useState({
    name: auth.currentUser.displayName,
    email: auth.currentUser.email,
  })
  const { name, email } = formData
  const onLogout = () => {
    auth.signOut()
    navigate('/')
  }
  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        // Update display name in firebase
        await updateProfile(auth.currentUser, {
          displayName: name,
        })

        // Update in firestore
        const docRef = doc(db, 'users', auth.currentUser.uid)
        await updateDoc(docRef, {
          name,
        })
      }
    } catch (error) {
      toast.error('something went wrong')
    }
  }
  const onChange = (e) => {
    setFormData((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.value,
      }
    })
  }
  const onDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      await deleteDoc(doc(db, 'listings', id))
      setListings((perv) => {
        return perv.filter((listing) => listing.id !== id)
      })
      toast.success('Listing deleted successfully')
    }
  }
  return (
    <div className="profile">
      <header className="profileHeader">
        <p className="pageHeader">my profile</p>
        <button type="button" className="logOut" onClick={onLogout}>
          Logout
        </button>
      </header>
      <main>
        <div className="profileDetailsHeader">
          <p className="personalDetailsText">Personal Details</p>
          <p
            className="changePersonalDetails"
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prev) => !prev)
            }}
          >
            {changeDetails ? 'done' : 'edit'}
          </p>
        </div>
        <div className="profileCard">
          <form action="">
            <input
              type="text"
              id="name"
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
            />
            <input
              type="text"
              id="email"
              className="profileEmail"
              disabled={true}
              value={email}
              // onChange={onChange}
            />
          </form>
        </div>
        <Link to="/create-listing" className="createListing">
          <img src={homeIcon} alt="home" />
          <p>sell or rent home</p>
          <img src={aroowKeyIcon} alt="arrow" />
        </Link>
        {!loading && listings?.length > 0 && (
          <>
            <p className="listingText">Your lIstings</p>
            <ul>
              {listings.map((listing) => (
                <ListingItem
                  id={listing.id}
                  key={listing.id}
                  listing={listing.data}
                  onDelete={() => onDelete(listing.id)}
                />
              ))}
            </ul>
          </>
        )}
      </main>
    </div>
  )
}

export default Profile
