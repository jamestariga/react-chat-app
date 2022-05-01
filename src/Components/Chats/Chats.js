import { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChatEngine } from 'react-chat-engine'
import { auth } from '../../firebase'
import { useAuth } from '../../Contexts/AuthContext'
import axios from 'axios'

const Chats = () => {
  const navigate = useNavigate()
  const mountRef = useRef(false)
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  const handleLogout = async () => {
    await auth.signOut()
    navigate('/')
  }

  const getFile = async (url) => {
    const response = await axios.get(url, {
      responseType: 'blob',
    })
    return new File([response.data], 'image.jpg', { type: 'image/jpeg' })
  }

  useEffect(() => {
    if (!mountRef.current) {
      mountRef.current = true

      if (!user || user === null) {
        navigate('/')
        return
      }
    }

    axios
      .get('https://api.chatengine.io/users/me/', {
        headers: {
          'project-id': '29bad356-69f3-412e-8791-9cf4b5c5ccff',
          'user-name': user.email,
          'user-secret': user.uid,
        },
      })
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        let formData = new FormData()
        formData.append('email', user.email)
        formData.append('username', user.email)
        formData.append('secret', user.uid)

        getFile(user.photoURL).then((avatar) => {
          formData.append('avatar', avatar, avatar.name)

          axios
            .post('https://api.chatengine.io/users/', formData, {
              headers: {
                'private-key': process.env.REACT_APP_CHATENGINE_PRIVATE_KEY,
              },
            })
            .then(() => {
              setLoading(false)
            })
            .catch((err) => {
              console.log('error', err.response)
            })
        })
      })
  }, [user, navigate])

  if (!user || loading) {
    return loading ? (
      <div className='loading'>
        <div className='lds-dual-ring'></div>
        <h1>Loading...</h1>
      </div>
    ) : (
      <div className='loading'>
        <div className='lds-dual-ring'></div>
        <h1>Logging in...</h1>
      </div>
    )
  }

  return (
    <div className='chats-page'>
      <div className='nav-bar'>
        <div className='logo-tab'>Chatrr</div>
        <div className='logout-tab' onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height='calc(100vh - 66px'
        projectID={process.env.REACT_APP_CHATENGINE_PROJECT_ID}
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  )
}

export default Chats
