import React,{ useState } from 'react'
import './App.css'
import { Search, Saved } from './components/components'
function App() {
  let [jobs,setJobs] = useState({})
  let [saved,setSaved] = useState({})
  let value={
    jobs:jobs,
    setJobs:setJobs,
    saved:saved,
    setSaved
  }
  return (
  <div className = "container">
    <div className = "searchContainer">
      <h1>Search Jobs</h1>
      <Search value={value} />
    </div>

    <div className = "savedContainer">
      <h1>Saved Jobs</h1>
      <Saved value={value} />
    </div>
  </div>
  )
}

export default App