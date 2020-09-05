import React,{ useRef,useEffect,useState } from 'react'
const JobsURI = 'http://localhost:3001/jobs'
export const Saved = (props) =>{
    let rows=[]
    let editJob = useRef(null)
    let editLoc = useRef(null)
    let editCom = useRef(null)
    let editSalary = useRef(null)
    useEffect(()=>{
        if(props.value.saved.info===undefined){
            const getSaved= async ()=>{
                let response = await fetch(JobsURI)
                let data = await response.json()
                props.value.setSaved({info:data.info})
            }
            getSaved()
        }
    })

    const handleDelete = async (id) => {
        let response = await fetch(JobsURI+'/'+id,{
            method:'DELETE'
        })

        let data = await response.json()   
        if(data.error) return 
        props.value.setSaved({
            info:props.value.saved.info.filter(e=>{
                return e._id!==id
            })
        })
    }
    let [showMe,setShowMe] = useState({
        id:''
    })

    const handleEdit = (id) =>{
        setShowMe({
            id:id
        })
    }

    const handleSave = async(id)=>{
        try{
            let response = await fetch(JobsURI+'/'+id,{
                method:'PUT',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    "job":{
                        "title":editJob.current.value,
                        "locationCom":editLoc.current.value,
                        "company":editCom.current.value,
                        "salary":editSalary.current.value
                    }
                })
            })
    
            let data = await response.json()
            if(data.error) return
            props.value.saved.info.map(e=>{
                if(e._id===id) {
                    e.title = editJob.current.value
                    e.locationCom = editLoc.current.value
                    e.company = editCom.current.value
                    e.salary = editSalary.current.value
                    return
                }
            })
            setShowMe({id:''})
        } catch(err) {
            console.error(err)
        }
    }

    if(props.value.saved.info){
        props.value.saved.info.map((e,index)=>{
            return rows.push(    
                <li key = {index}>
                    {
                    showMe.id===e._id ? 
                    <>
                       <p><input ref={editJob}  defaultValue={e.title}></input></p>
                    </>:
                       <p id={e._id}>{e.title}</p>
                    }

                    {
                    showMe.id===e._id ? 
                    <>
                       <p><input ref={editCom} defaultValue={e.company}></input></p>
               
                    </>:
                       <p id={e.company}>{e.company}</p>
                    }

                    {
                    showMe.id===e._id ? 
                    <>
                       <p><input ref={editLoc}  defaultValue={e.locationCom}></input></p>                     
                    </>:
                       <p id={e.locationCom}>{e.locationCom}</p>
                    }

{
                    showMe.id===e._id ? 
                    <>
                       <p><input ref={editSalary}  defaultValue={e.salary}></input></p>                     
                       <button onClick = {()=>handleSave(e._id)}>save</button>
                    </>:
                       <p id={e.salary}>{e.salary}</p>
                    }
                    <button onClick={()=>handleEdit(e._id,e.title)}>edit</button>
                    <button onClick={()=>handleDelete(e._id)}>delete</button>
                </li>
            )
            })
    }
    return (
        <ul>
            {rows}
        </ul>
    )
}


export const Search = (props) =>{
    let search = useRef(null)

    let start = 10
    const handleSearch = async () => {
        let q = search.current.value.split(' ').join('+')
        if(!q) return 
        try{
            let response = await fetch(JobsURI+'?q='+q+'&&start='+start)
            let data = await response.json()
            props.value.setJobs({jobs:data.info})
        } catch(err) {
            console.log(err)
        }
    }

    const handleSave = async (job) => {
        let response = await fetch(JobsURI,{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                "job":job
            })
            })
        let data = await response.json()
        props.value.setSaved({
            info:[...props.value.saved.info,data.info]
        })
    }

    const handlePage = async() =>{
        start = start + 10
        let q = search.current.value.split(' ').join('+')
        if(!q) return 
        try{
            let response = await fetch(JobsURI+'?q='+q+'&&start='+start)
            let data = await response.json()
            props.value.setJobs({jobs:data.info})
        } catch(err) {
            console.log(err)
        }
    }
    return (
        <>
            <input ref={search}></input>
            <button onClick = {handleSearch}>search</button>
            <ul>
                {props.value.jobs.jobs && <button onClick = {handlePage}>Next Page</button>}
                {props.value.jobs.jobs && props.value.jobs.jobs.map((e,index)=>{
                    return (
                    <li key = {index}>
                        <p>{e.title}</p>
                        <p>{e.company}</p>
                        <p>{e.locationCom}</p>
                        <p>{e.salary}</p>
                        <button onClick={()=>handleSave(e)}>save</button>
                    </li>
                    )
                })}
            </ul>
      
        </>
    )
  }