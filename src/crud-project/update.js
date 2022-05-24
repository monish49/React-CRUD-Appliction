import axios from 'axios';
import React,{useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Update = () => {
    const navigate=useNavigate();
    const [id,setId]=useState();
    const[name,setName]=useState('');
    const[rew,setrew]=useState('');
    useEffect(()=>{
        setName(localStorage.getItem('name'))
        setrew(localStorage.getItem('rew'))
        setId(localStorage.getItem('id'))
    
    },[])
    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.put(`https://622d8add8d943bae34815f66.mockapi.io/details/${id}`,
        {
            name,
            rew
        }
        ).then(()=>{alert('data is updated')
             navigate('/')
         })
       
    }
  return (
    <div>
      <div className='form-box mt-5'>
                <form>
                    <div className='form-group'>
                        <label>Name</label>
                        <input type="text" className="form-control" placeholder='name' value={ name} onChange={(e)=>setName(e.target.value)}/>
                    </div>
                    <div className='form-group'>
                        <label>Review</label>
                         <textarea rows="3" cols="40" className="form-control" type="text" placeholder='review' value={rew} onChange={(e)=>setrew(e.target.value)} ></textarea>
                    </div>
                    <div className='d-grid text-center mt-3'>
                        <button className='btn btn-lg btn-primary' onClick={handleSubmit}>Update</button>
                    </div>
                </form>

            </div>

    </div>
  )
}

export default Update