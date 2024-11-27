import React, { useEffect, useState } from 'react';
import { FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash } from 'react-icons/fa';
import {ToastContainer} from 'react-toastify';
import { CreateTask, GetAllTasks , DeleteTaskById, UpdateTaskById} from './api';
import { notify } from './utils';


const TaskManager = () => {

    const [input,setInput] = useState('');
    const [tasks,setTasks] = useState([ ]);
    const [copyTasks,setCopyTasks] = useState([ ]);
    const[updateTask, setUpdateTask] =useState(null)

    const handleTask = ( )=>{
         if(updateTask && input ){
         //update api call 
         console.log('Update API Call');
         const obj = {
            taskName: input,
            isBoolean: updateTask.isBoolean,
            _id : updateTask._id
         }
         handleUpdateItem(obj);
         } else if( updateTask=== null && input){
            //create api call 
            console.log('Create API Call');
            handleAddTask( ) ; 
         }  
         setInput('');
    }

    useEffect(( )=>{
        if(updateTask){
            setInput(updateTask.taskName )
        }
     },[updateTask]);




    const handleAddTask =  async ( )=>{
        const obj = {
            taskName : input,
            isBoolean : false
        }
       try{
          const { success , message } =
           await CreateTask(obj);
          if(success){
            //show success toast
            notify(message, 'success')
          }else{
            //show toast error
            notify(message, 'error')
          }  
        //   const obj = {
        //     taskName,
        //     isBoolean :  !isBoolean
        // }
        // try{
        //     const { success,message} = await UpdateTaskById( _id, obj );
        //     if(success){
        //         //show success toast
        //         notify(message, 'success')
        //       }else{
        //         //show toast error
        //         notify(message, 'error')
        //       }  
        //       fetchAllTasks( ) 
          
        //  }catch(err){
        //   console.log(err);
        //   notify('Failed to Create Task', 'error')        
        //  }  
    
          fetchAllTasks( )
       }catch(err){
        console.log(err);
        notify('Failed to Create Task', 'error')        
       }  
    }


    const fetchAllTasks = async ( ) =>{
        try{
            const { data} = await GetAllTasks( );
            setTasks(data);
        setCopyTasks(data);
          
         }catch(err){
          console.log(err);
          notify('Failed to Create Task', 'error')        
         }  
    }
useEffect(( )=>{ 
    fetchAllTasks( )
},[ ])


const handleDeleteTask = async ( id)=>{
    try{
        const { success,message} = await DeleteTaskById( id);
        if(success){
            //show success toast
            notify(message, 'success')
          }else{
            //show toast error
            notify(message, 'error')
          }  
          fetchAllTasks( )
      
     }catch(err){
      console.log(err);
      notify('Failed to Create Task', 'error')        
     }  
}

const  handleCheckandUncheck = async(item)=>{ 
    const { _id, isBoolean , taskName} = item;
    const obj = {
        taskName,
        isBoolean :  !isBoolean
    }
    try{
        const { success,message} = 
        await UpdateTaskById( _id, obj );
        if(success){
            //show success toast
            notify(message, 'success')
          }else{
            //show toast error
            notify(message, 'error')
          }  
          fetchAllTasks( ) 
      
     }catch(err){
      console.log(err);
      notify('Failed to Create Task', 'error')        
     }  

}


const handleUpdateItem =async (item)=>{
    const {_id, isBoolean, taskName}= item;
    const obj = {
        taskName,
        isBoolean :  isBoolean

    }
    try{
        const { success,message} =
         await UpdateTaskById( _id, obj );
        if(success){
            //show success toast
            notify(message, 'success')
          }else{
            //show toast error
            notify(message, 'error')
          }  
          fetchAllTasks( ) 
      
     }catch(err){
      console.log(err);
      notify('Failed to Create Task', 'error')        
     }  

}

const handleSearch = (e) => {
    const term = e.target.value;
    const oldTasks = [...copyTasks];
    const results = oldTasks.filter((item) => item.taskName.includes(term));
    setTasks(results);
}
 
    return (
        <div className='d-flex flex-column align-items-center
        w-50 m-auto mt-5'>
            <h1 className='mb-4'  style={{ color: 'purple', fontSize: '2rem', fontWeight: 'bold', fontStyle: 'italic' }} >VIRTUAL MANAGER</h1>

            {/* Input and Search box */}

            <div className='d-flex justify-content-between
            align-items-center mb-4 w-100'>

                <div className='input-group flex-grow-1 me-2'>
                    <input type='text'
                    value={input}
                    onChange={
                        (e)=> setInput(e.target.value)
                        }
                        className='form-control me-1'
                        placeholder='Add a new Task'
                    />
                    
                    <button
                         onClick={handleTask}
                          className='btn btn-success btn-sm me-2'
                    >
                        <FaPlus className='m-2' />
                    </button>
                </div>

                <div className='input-group flex-grow-1'>
                    <span
                        className='input-group-text'
                    >
                        <FaSearch />
                    </span>

                    <input
                    onChange={handleSearch}
                         className='form-control'
                        type='text'
                        placeholder='Search tasks'
                    />

                </div>
            </div>

            {/* List of items */}

            <div className='d-flex flex-column w-100'>
            {
                tasks.map((item)=>(
                    <div key={item._id} className='m-2 p-2 border bg-light
                w-100 rounded-3 d-flex justify-content-between
                align-items-center'>
                            <span
                                className=  {item.isBoolean ? 'text-decoration-line-through' : ''}
                            >{item.taskName}
                            </span>

                            <div className=''> 
                                <button
                                   onClick={()=> handleCheckandUncheck(item)}
                                    className='btn btn-success
                            btn-sm me-2'
                                    type='button'>
                                    <FaCheck />
                                </button>


                                <button
                                onClick={ ( )=>setUpdateTask(item)}
                                    className='btn btn-primary
                            btn-sm me-2'
                                    type='button'>
                                    <FaPencilAlt />
                                </button>


                                <button   
                                    className='btn btn-danger
                            btn-sm me-2'
                            onClick={( )=> handleDeleteTask( item._id)}
                                    type='button'>
                                    <FaTrash />
                                </button>

                            </div>
                        </div>
                ))
            }
                    
                
            </div>

            {/* Toastify */}

            <ToastContainer  
                position='top-right'
                autoClose={3000}
                hideProgressBar={false}
            />
         
        </div>
    )

}

export default TaskManager