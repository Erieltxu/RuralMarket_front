import { useState } from 'react'

import './App.css'

import HomePhotoP from './components/HomePhotoP'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <HomePhotoP></HomePhotoP>
    </>
       
  )
}

export default Home;
