import { useEffect, useRef, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Todo from './components/Todo'

function App() {

  const [todos, setTodos] = useState(()=>{
    const stored = localStorage.getItem("Todos");
    return stored?JSON.parse(stored):[]
  });
  const [editId, setEditId] = useState(null);
  const [inputValue,setInputValue] = useState("");

  const inputRef = useRef();
  const pendingTodos = useRef();
  const completedTodos = useRef();
  const checkFinished = useRef();


function handleChange(e){
  setInputValue(e.target.value);
}



  useEffect(()=>{
    localStorage.setItem("Todos",JSON.stringify(todos))
  },[todos])

  function handleEdit(id) {
    const editTodo = todos.find((item) => item.id == id)
    setEditId(editTodo.id)
    console.log(editTodo)
    console.log(editTodo.id)
    console.log(typeof (editTodo.id))
    // inputRef.current.value = editTodo.todo;
    setInputValue(editTodo.todo)
    inputRef.current.focus()
  }




  function handleDelete(id) {
    setTodos(prev => prev.filter((item) => item.id != id))
  }



  function handleHideFinished() {
    console.log(checkFinished.current.checked)
    checkFinished.current.checked ? pendingTodos.current.style.display = "none" : pendingTodos.current.style.display = "flex"
    checkFinished.current.checked ? completedTodos.current.style.display = "flex" : completedTodos.current.style.display = "none"
  }



  useEffect(() => {
    pendingTodos.current.style.display = "flex"
    completedTodos.current.style.display = "none"
  }, [])
 

  function handleSave(e) {

    if (editId == null) {
      if (e && e.key && e.key !== "Enter") return;

      if (inputValue.trim() == "") {
        return;
      }

      const todo = {
        todo: inputValue.trim(),
        id: crypto.randomUUID(),
        isFinished: false
      }
      setTodos(prev => [...prev, todo])
      setInputValue("")
    }


    else {
      if (e && e.key && e.key !== "Enter") return;
      if (inputValue.trim() == "") {
        return;
      }
      console.log("I'm inside else")
      console.log(inputValue.trim())
      setTodos(prev=>prev.map(item=>item.id==editId?{...item,todo: inputValue.trim()}:item))
      setEditId(null)
      setInputValue("")
    }

  }



  function handleFinished(id) {
    setTodos(prevTodos => prevTodos.map(item => (
      item.id === id ? { ...item, isFinished: !item.isFinished } : item
    )
    ))
  }

  function isChecked(id) {
    const todo = todos.find(item => item.id == id);
    return todo.isFinished;
  }




  return (
    <>
      <div className="wrapper w-screen min-h-screen bg-[#141414] flex flex-col gap-10">
        <Navbar />
        <div className="cardContainer w-[60vw] max-md:w-[90vw] h-125 min-h-125 bg-[#080808a1] mx-auto p-4 rounded-2xl flex flex-col gap-4">

          <div className='text-3xl flex justify-center max-xl:text-xl max-md:text-lg '>ITask - Manage your todos at one place!</div>
          <div className="add-todo-section w-full flex flex-col gap-2 min-h-30 border-b border-b-[#282828]">
            <h4 className="add-a-todo text-2xl max-xl:text-xl">Add a Todo</h4>
            <div className="input-section flex items-center gap-2 justify-center">
              <input type="text" className='w-[90%] border bg-transparent rounded-2xl h-8 pl-4' ref={inputRef} value={inputValue} onChange={(e)=>handleChange(e)}  onKeyDown={(e) => { handleSave(e) }} />
              <button className='border flex justify-center items-center rounded-2xl border-white w-16 bg-[#141414] h-8' onClick={handleSave}><span>Save</span></button>
            </div>
            <label htmlFor="showFinished" className='flex items-center gap-2 w-fit'>
              <input ref={checkFinished} onClick={handleHideFinished} type="checkbox" name="" id="showFinished" />
              <div className="show-finished-div" >Show Finished</div>
            </label>
          </div>
          <div className="your-todos-section w-full h-[60%] flex flex-col gap-2">
            <div className='text-2xl max-xl:text-xl'>Your Todos</div>

            <div ref={pendingTodos} className="pendingTodos overflow-y-auto flex flex-col w-full h-full max-h-100
                      [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:rounded-none
                      [&::-webkit-scrollbar-thumb]:rounded-none
                       dark:[&::-webkit-scrollbar-track]:bg-[#191919]
                                dark:[&::-webkit-scrollbar-thumb]:bg-[#353535]">

          

              {todos.filter(item=>(!item.isFinished && item.id!=editId)).map(item=>(
                <Todo handleDelete={handleDelete} handleEdit={handleEdit} isChecked={isChecked} handleFinished={handleFinished} isFinished={item.isFinished} key={item.id} todo={item.todo} id={item.id} />
              ))}

            </div>

            <div ref={completedTodos} className="completedTodos overflow-y-auto flex flex-col gap-2.5 w-full h-full max-h-100
                      [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:rounded-none
                      [&::-webkit-scrollbar-thumb]:rounded-none
                       dark:[&::-webkit-scrollbar-track]:bg-[#191919]
                                dark:[&::-webkit-scrollbar-thumb]:bg-[#353535]">
              {todos.map((item) => {
                if (item.isFinished) {
                  return (
                    <Todo handleDelete={handleDelete} handleEdit={handleEdit} isChecked={isChecked} handleFinished={handleFinished} isFinished={item.isFinished} key={item.id} todo={item.todo} id={item.id} />
                  )
                }
              })}

            </div>


          </div>

        </div>
      </div>
    </>
  )
}

export default App
