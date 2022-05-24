import React,{useEffect, useState} from 'react'
import './home.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const Home = () => {
    const navigate=useNavigate();
    const[name,setName]=useState('');
    const[rew,setrew]=useState('');    

    const[data,setData]=useState([]);
  const handleSubmit=(e)=>{
      e.preventDefault();       //create
      axios.post('https://622d8add8d943bae34815f66.mockapi.io/details',{name,rew})
      .then(()=>window.location.reload())

  }

   useEffect(()=>{
    axios.get("https://622d8add8d943bae34815f66.mockapi.io/details")
      .then(res=>{setData(res.data)})
    },[])
 
   const handleDelete=(id,name)=>{
       axios.delete(`https://622d8add8d943bae34815f66.mockapi.io/details/${id}`)
      .then(()=>{alert(`are you sure want to delete ${name}`)
       var newData=data.filter((item)=>{

           return item.id!==id    
        //    (need to return elements whose id is not equal to main selected id)
       })
       setData(newData)
      
    })

   }
   const  handleUpdate=(id,name,rew)=>{
       localStorage.setItem('id',id);
       localStorage.setItem('name',name);
       localStorage.setItem('rew',rew);
    navigate('/update')    
} 
    return (

        <>
        <div className='con'>
            <h1 className='text-center text-warning'> React CRUD application </h1>
            <div className='form-box mt-5'>
                <form>
                    <div className='form-group'>
                        <label>Movie Name</label>
                        <input type="text" className="form-control" placeholder='name' value={ name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className='form-group'>
                        <label>Review</label>
                        <textarea rows="3" cols="40" className="form-control" type="text" placeholder='review' value={rew} onChange={ (e)=>setrew(e.target.value)} ></textarea>
                    </div>
                    <div className='d-grid text-center mt-3'>
                        <button className='btn btn-lg btn-primary' onClick={handleSubmit}>Submit</button>
                    </div>
                </form>

            </div>
            </div>
            <div className='sec'>
            <div className='row container main-rows'>
                {
                    data.map(({id,name,rew})=>
                    <div key={id} className='col-4 mb-' id='col'>
                       <div className='card'>
                           <div className='card-body' id='col'>
                               <div>
                               <button onClick={()=>handleDelete(id,name)}><i className='fa fa-trash'></i></button>
                                 <button onClick={()=>handleUpdate(id,name,rew)}><i className='fa fa-edit'></i></button>
                                 </div>
                                <h3 className='text-success'>{name}</h3>
                                <h5 >{rew}</h5>
                               </div>
                           </div>
                    </div>
                    )}
             </div>
             </div>
             
        </>
    )
}

export default Home