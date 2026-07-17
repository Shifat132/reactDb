import { useEffect, useState } from 'react'
import './App.css'
import { getDatabase, ref, set, onValue, push} from "firebase/database";


function App() {


  const [text, setText] = useState("");
  const [textError, setTextError] = useState("")
  const [allText, setAllText] = useState([])

  

  const handleClick = (e) => {
    e.preventDefault()

    if (text == "") {
      setTextError("please enter your task")
    }
    const db = getDatabase();
    set(push(ref(db, 'TodoName')), {
      todoname: text
    });
  }

  useEffect(() => {
    const db = getDatabase();
    const getDataRef = ref(db, 'TodoName');
    onValue(getDataRef, (snapshot) => {
      let arr = []
      snapshot.forEach((item)=>{
        arr.push(item.val())
      })
      setAllText(arr)
    });
  },[])

  return (
    <>
      <h1 className='text-center text-2xl bg-cyan-600 text-white  py-5'>Welcome to our ToDo application </h1>
      <div className='h-150 py-25 bg-[url(./assets/tnnx.jpg)] bg-no-repeat bg-cover bg-center'>
        <form className="max-w-sm mx-auto shadow-xs">
          <div className="mb-5">
            <label
              htmlFor="text"
              className="block mb-2.5 text-lg font-medium text-white"
            >
              Enter Your Task
            </label>
            <input onChange={(e) => { setText(e.target.value) }}
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
            Submit
          </button>

          <ul>
            {
              allText.map((item)=>{
                console.log(item)
              })
            }
          </ul>
        </form>
      </div>
    </>
  )
}

export default App
