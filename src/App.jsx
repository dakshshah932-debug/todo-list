import { useState, useEffect } from 'react'
// import Checkbox from './components/Checkbox'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';
uuidv4();
import './App.css'
import deleteIcon from './assets/delete.svg'
import editIcon from './assets/edit.svg'


function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  // const [showFinished, setshowFinished] = useState([])


  useEffect(() => {
    console.log("i was first useeff")

    let todoString = localStorage.getItem("todos")
    let finishedtodoString = localStorage.getItem("finishedtodos")


    if (todoString) {
      let todos = JSON.parse(todoString)
      setTodos(todos)
    }
    // if (showFinished) {
    //   let showFinished = JSON.parse(finishedtodoString)
    //   setshowFinished(showFinished)
    // }
    else {
      console.log("something happening")
    }
    

  }, [])



  useEffect(() => {
    console.log("useeffect that runs when todos is altered")
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos))

    }
    // if (showFinished.length > 0) {
    //   localStorage.setItem("finishedtodos", JSON.stringify(showFinished))

    // }
    if (todos.length == 0) {
      localStorage.clear()
    }
    // handleHideFinished()


  }, [todos])

  // useEffect(() => {

  //   // if (showFinished.length > 0) {
  //   //   localStorage.setItem("finishedtodos", JSON.stringify(showFinished))

  //   // }




  // }, [showFinished])


  const handleSave = () => {
    console.log("i am handlesave")

    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false, isShow: false }])

    setTodo("")
    // console.log("todos are", todos);

    // saveToLS(todos)


  }






  const handleEdit = (e, id) => {
    console.log("i am handleedit")



    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newtodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newtodos)


  }


  const handleDelete = (e, id) => {
    console.log("i am handledelete")


    let index = todos.findIndex(todo => {
      return todo.id == id
    })
    confirm(`are you sure you want to delete "${todos[index].todo}"`)
    let newtodos = todos.filter(item => {
      console.log(item)

      return item.id !== id
    })

    setTodos(newtodos)





  }


  const handleChange = (e) => {
    console.log("i am handlechange")
    setTodo(e.target.value)



  }


  const handleCheckbox = (e) => {
    console.log("i am handlecheckbox")
    let id = e.target.name


    let index = todos.findIndex(item => {
      return item.id === id
    })


    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted

    setTodos(newtodos)





  }
  const handleHideFinished = (e) => {
    console.log("i am handle hide finished ")

    let newTodos = todos.map(item => {
      if (item.isCompleted) {
        return { ...item, isShow: !item.isShow };
      }
      return item;
    });

    setTodos(newTodos);
    console.log("updated todos after toggling isShow", newTodos);
  };
 

  return (

    <>
      <Navbar />
      <div className="container mx-auto w-xl my-5 ">
        <div className="pink bg-violet-100 rounded-2xl  ">


          <div className="flex justify-center items-center ">
            <h1 className="font-bold text-2xl">
              iTask - Manage your todos at one place
            </h1>
          </div>

          <div className='heading font-bold mx-6 my-6 text-xl '><h2>Add a todo</h2></div>


          <div className="input">
            <input onChange={handleChange} value={todo}
              type="text"
              placeholder="Enter something..."
              className="bg-white text-black rounded-full px-4 py-2 border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400 mx-4 w-md max-w-xl"
            />
            <button onClick={handleSave} className='sasvebtn cursor-pointer bg-violet-500 text-white px-5 py-2 rounded-3xl font-bold hover:bg-violet-800 transition duration-50 focus:outline-none border-none'>
              Save
            </button>
          </div>


          <div className="showtodos flex items-center mx-4 mt-4 text-md gap-3">
            <input onClick={handleHideFinished}
              type="checkbox"
              className=" h-5 accent-indigo-900 cursor-pointer"
            />
            <div className='mb-2' >Hide Finished</div>
          </div>

         

          <hr className='w-lg mx-auto' />


          <div className='heading font-bold mx-6 my-6 text-xl '>
            <h2>Your Todos</h2>

          </div>
          {todos.length == 0 ? <div className='my-4 mx-6x font-semibold mx-6.5'>No todos to display</div> : ""}

          <div className='overflow-y-scroll h-44'>
            {todos.map(item => {
              return <div key={item.id} className="todos-done">
                <div className={item.isShow && item.isCompleted ? "hidden" : ""}>
                  <div className='flex items-center justify-between my-3'>
                    <div className="first gap-2 flex mx-4">
                      <div className="checkbox mt-1">
                        <input
                          type="checkbox" name={item.id} onChange={handleCheckbox} checked={item.isCompleted} value={item.isCompleted}
                          className=" h-5 accent-indigo-900 cursor-pointer"
                        />
                      </div>
                      <div className={item.isCompleted ? "line-through " : ""} key={item.id} >{item.todo}</div>
                    </div>

                    <div className="editbin flex gap-1 mx-3 items-center">
                      <button onClick={(e) => handleEdit(e, item.id)} className="  edit h-6 w-6 bg-violet-800 flex items-center rounded-lg cursor-pointer ">

                        <img src={editIcon} alt="" name={item.id} />
                      </button>


                      <button onClick={(e) => handleDelete(e, item.id)} className="bin h-6 w-6 bg-violet-800 flex items-center rounded-lg  cursor-pointer ">

                        <img src={deleteIcon} alt="" name={item.id} />

                      </button>
                    </div>
                  </div>
                </div>
              </div>
            })}


          </div>
        </div>
      </div>

    </>
  )
}


export default App
