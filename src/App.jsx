import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { baseUrl } from './Url';


const App = () => {
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')
  const [chatHistory, setChatHistory] = useState([])
  const [load, setLoad] = useState(false)


  useEffect(() => {  //save to localStorage
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory])

  useEffect(() => {//get the stored history
    const storedHistory = localStorage.getItem('chatHistory');
    if (storedHistory) {
      setChatHistory(JSON.parse(storedHistory))
    }
  }, [])
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if(!prompt.trim()){
      toast.error('Empty input') 
    }
    setLoad(true)
    try {
      const result = await axios.post(`${baseUrl}`, { prompt })
      setResponse(result.data)
      setChatHistory((oldHistory) => [...oldHistory, {
        prompt: prompt, response: result.data
      }])
      setPrompt("")
    }
    catch (err) {
      console.log('Something Went Wrong! : ', err)
    }
    finally{
      setLoad(false)
    }
  }
  return (
    <div className="min-h-screen bg-[#27282A] text-white py-8 px-4">
      <div className="max-w-md mx-auto">
        <div className="mb-4 flex items-center">
          <input type="text" value={prompt} placeholder='Write your query here...' onChange={(e) => setPrompt(e.target.value)} className="flex-1 px-3 py-2 rounded border-2 border-green-500 focus:outline-none focus:border-green-700 bg-black text-white" />
          <button onClick={handleSubmit} className="ml-2 px-4 py-2 rounded bg-green-500 hover:bg-green-800 focus:bg-green-950">Submit</button>
        </div>
        {/* {load && <div className="text-center text-green-400">Loading...</div>} */}
        {load && (
          <div className="loader mx-auto"></div>
        )}
        <div className="mb-4">
          <p>{response}</p>
        </div>
    
        <div>
          {chatHistory.length > 0 && (<div className='text-center bg-black mb-4 p-2 font-bold text-2xl rounded'>History</div>)}
          {chatHistory.slice(0).reverse().map((historyItem, index) => (
            <div key={index} className="mb-4 border-b border-green-500 pb-4 bg-slate-900 p-4 rounded-xl">
              <p className="text-green-400 mb-4">Prompt: {historyItem.prompt}</p>
              <p className="text-green-300">Response: {historyItem.response}</p>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default App
