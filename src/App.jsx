import { useEffect, useState } from 'react'
import './App.css'
import { getDatabase, ref, set, onValue, push, remove, update } from "firebase/database";
import { IoTrashOutline } from "react-icons/io5";
import { LiaUserEditSolid } from "react-icons/lia";
import { ToastContainer, toast, Zoom } from 'react-toastify';





function App() {

  const notify = () => toast.success('🦄 task added successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Zoom,
  });

  const deleteTask = ()=> toast.warn('🦄 task deleted successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Zoom,
  });
  const updateTask = ()=> toast.info('🦄 task updated successfully!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Zoom,
  });
  
  



  const [text, setText] = useState("");
  const [textError, setTextError] = useState("")
  const [allText, setAllText] = useState([])
  const [edit, setEdit] = useState(false)
  const [updating, setUpdating] = useState(null)

  

  const handleClick = (e) => {
    e.preventDefault()

    if (text == "") {
      setTextError("please enter your task")
    }else{
      const db = getDatabase();
    if (edit && updating) {
        update(ref(db, 'TodoName/' + updating), {
          todoname: text
        }).then(() => {
          setText("");
          setTextError("");
          setEdit(false);
          setUpdating(null);
          updateTask()
        })
      } else {
        set(push(ref(db, 'TodoName')), {
          todoname: text
        }).then(() => {
          setText("");
          setTextError("");
          notify()
        })
      }
    }
    
  }

  useEffect(() => {
    const db = getDatabase();
    const getDataRef = ref(db, 'TodoName');
    onValue(getDataRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item) => {
        arr.push({ value: item.val().todoname, id: item.key })
      })
      setAllText(arr)
    });
  }, [])

  const handleDelete = (id) => {
    const db = getDatabase();
    remove(ref(db, 'TodoName/' + id))
      .then(
        setTextError(""),
        deleteTask()
      )
  }

  const handleEdit = (value, id)=>{
    setUpdating(id)
    setEdit(!edit)
    setText(value)
  }

  return (
    <div className='h-150 bg-cyan-300'>
      
      <div className='bg-[url(./assets/thnx.jpg)] bg-no-repeat bg-cover bg-center'>
        <ToastContainer />
        <h1 className='text-center text-2xl bg-cyan-600 text-white  py-5'>Welcome to our ToDo application </h1>
        <div className='py-25 '>
          <form className="max-w-sm mx-auto shadow-xs">
            <div className="mb-5">
              <label
                htmlFor="text"
                className="block mb-2.5 text-lg font-medium text-white"
              >
                Enter Your Task
              </label>
              <input value={text} onChange={(e) => { setText(e.target.value) }}
                type="text"

                className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                placeholder="enter your todo task"

              />
              <p className='text-amber-100'>{textError}</p>
            </div>

            <button onClick={handleClick}
              type="submit"
              className="text-white bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              {edit ? "Update" : "Submit"}
            </button>

            <ul className='mt-2.5 p-5  text-[#FF2D2D] font-black [-webkit-text-stroke:2px_black] [text-shadow:3px_3px_6px_rgba(0,0,0,0.4)]'>
              {
                allText.map((item) => {
                  return <li className='text-3xl capitalize flex justify-between'>{item.value}
                    <div className='flex gap-2.5 cursor-pointer'>
                      <IoTrashOutline onClick={() => handleDelete(item.id)} className=' text-dark' />
                      <LiaUserEditSolid onClick={()=> handleEdit(item.value, item.id)} className='text-dark' />
                    </div>
                  </li>
                })
              }
            </ul>
          </form>
        </div>
      </div>
        <h2 className='text-center mt-5 text-amber-100 text-7xl'>Thanks me later</h2>
    </div>
  )
}

export default App
