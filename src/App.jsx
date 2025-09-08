import { useState, useEffect } from 'react'
import './App.css'
import "prismjs/themes/prism-tomorrow.css"
import prism from "prismjs"
import Markdown from "react-markdown"
import axios from "axios";
import Editor from "react-simple-code-editor"



function App() {
  const [count, setCount] = useState(0)

  const [code , setCode] = useState(`function sum() {
    return 1+ 1 + 1}`)

  useEffect( () => {
    prism.highlightAll()
  })


  const [review, setReview] = useState(``)


  async function codeReview() {
   const response = await axios.post('https://code-review-backend-nu.vercel.app/ai/getReview', {code})
   setReview(response.data)
  }


  return (
    <>
    <main>
    <div className="left">
      <div className="code">
        <Editor
           value={code}
           onValueChange={code => setCode(code)}
           highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
           padding={10}
           style={{
             fontFamily: '"Fira code", "Fira Mono", monospace',
             fontSize: 16,
             border: "1px solid #ddd",
             borderRadius: "5px",
             height: "100%",
             width: "100%"
           }}
         />
      </div>
      <div
       onClick={codeReview}
       className="review">Review</div>
    </div>
    <div className="right">
      <Markdown>{review}</Markdown>
    </div>
    </main>
    </>
  )
}

export default App
