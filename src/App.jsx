import { useEffect, useRef, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Todo from './components/Todo'

function App() {

  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(null);

  const inputRef = useRef();
  const pendingTodos = useRef();
  const completedTodos = useRef();
  const checkFinished = useRef();
  useEffect(() => {
    if (localStorage.getItem("Todos")) {
      const StringData = localStorage.getItem("Todos");
      const data = JSON.parse(StringData);
      setTodos(data)
    }
  }, [])


  function handleEdit(id) {
    const editTodo = todos.filter((item) => item.id == id)
    console.log(editTodo[0])
    console.log(editTodo[0].id)
    console.log(typeof(editTodo[0].id))
    setEditId(editTodo[0].id)
    // setTodos(todos.filter(item => item.id != id))
    inputRef.current.value = editTodo[0].todo;
    inputRef.current.focus()
    handleDelete(id)
  }

  useEffect(()=>{
      console.log(editId)
    },[editId])

    

    
  function handleDelete(id) {
    const oldData = localStorage.getItem("Todos");
    const oldJsonData = JSON.parse(oldData);
    const newJsonData = oldJsonData.filter((item) => item.id != id)
    localStorage.setItem("Todos", JSON.stringify(newJsonData))
    setTodos(todos.filter((item) => item.id != id))
    console.log(newJsonData)
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



  // function saveByEnter(e) {


  //   if (e.key != "Enter") return;
  //   if (inputRef.current.value.trim() == "") {
  //     return;
  //   }
  //   const newTodo = {
  //     todo: inputRef.current.value.trim(),
  //     id: crypto.randomUUID(),
  //     isFinished: false
  //   }
  //   setTodos(prev => [...prev, newTodo])

  //   const oldData = localStorage.getItem("Todos")
  //   const oldJsonData = oldData ? JSON.parse(oldData) : [];
  //   oldJsonData.push(newTodo);
  //   localStorage.setItem("Todos", JSON.stringify(oldJsonData))
  //   inputRef.current.value = "";
  // }


  function handleSave(e) {

    if(editId == null){
      if(e&&e.key&&e.key!=="Enter") return;

      if (inputRef.current.value.trim() == "") {
        return;
      }

      const todo = {
        todo: inputRef.current.value.trim(),
        id: crypto.randomUUID(),
        isFinished: false
      }
      setTodos(prev => [...prev, todo])
      const oldData = localStorage.getItem("Todos")
      const oldJsonData = oldData ? JSON.parse(oldData) : [];
      oldJsonData.push(todo);
      localStorage.setItem("Todos", JSON.stringify(oldJsonData))
      inputRef.current.value = "";
    }

    else {
      if(e&&e.key&&e.key!=="Enter") return;

      if (inputRef.current.value.trim() == "") {
        return;
      }
      console.log("I'm inside else")
      const todo = {
        todo: inputRef.current.value.trim(),
        id: editId,
        isFinished: false
      }
      setTodos(prev => [...prev, todo])
      const oldData = localStorage.getItem("Todos")
      const oldJsonData = oldData ? JSON.parse(oldData) : [];
      // const newJsonData = oldJsonData.map((item)=>item.id==editId?{...item,todo:inputRef.current.value.trim()}:item)
      oldJsonData.push(todo);
      localStorage.setItem("Todos", JSON.stringify(oldJsonData))
      inputRef.current.value = "";
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
        <div className="cardContainer w-[50vw] h-125 min-h-125 bg-[#080808a1] mx-auto p-4 rounded-2xl flex flex-col gap-4">

          <div className='text-3xl flex justify-center max-xl:text-xl max-md:text-lg '>ITask - Manage your todos at one place!</div>
          <div className="add-todo-section w-full flex flex-col gap-2 min-h-30 border-b border-b-[#282828]">
            <h4 className="add-a-todo text-2xl max-xl:text-xl">Add a Todo</h4>
            <div className="input-section flex items-center gap-2 justify-center">
              <input ref={inputRef} type="text" className='w-[90%] border bg-transparent rounded-2xl h-8 pl-4' onKeyDown={(e) => { handleSave(e) }} />
              <button className='border flex justify-center items-center rounded-2xl border-white w-16 bg-[#141414] h-8' onClick={handleSave}><span>Save</span></button>
            </div>
            <label htmlFor="showFinished" className='flex items-center gap-2 w-fit'>
              <input ref={checkFinished} onClick={handleHideFinished} type="checkbox" name="" id="showFinished" />
              <div className="show-finished-div" >Show Finished</div>
            </label>
          </div>
          <div className="your-todos-section w-full h-[60%] flex flex-col gap-2">
            <div className='text-2xl max-xl:text-xl'>Your Todos</div>

            <div ref={pendingTodos} className="pendingTodos overflow-y-auto flex flex-col gap-2.5 w-full h-full max-h-100
                      [&::-webkit-scrollbar]:w-2
                  [&::-webkit-scrollbar-track]:rounded-none
                      [&::-webkit-scrollbar-thumb]:rounded-none
                       dark:[&::-webkit-scrollbar-track]:bg-[#191919]
                                dark:[&::-webkit-scrollbar-thumb]:bg-[#353535]">

              {todos.map((item) => {

                if (!item.isFinished) {
                  return (
                    <Todo handleDelete={handleDelete} handleEdit={handleEdit} isChecked={isChecked} handleFinished={handleFinished} isFinished={item.isFinished} key={item.id} todo={item.todo} id={item.id} />
                  )
                }

              })}
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
