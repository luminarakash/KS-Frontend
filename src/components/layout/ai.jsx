import { useState, useEffect, useRef } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import Navbar from "./Header";
import WImg from "../../assets/wlcm.svg";

function AIAssistant() {
  const [prompt, setPrompt] = useState(`मेरी भैंस ने दूध देना कम कर दिया है`)
  const [response, setResponse] = useState(``)
  const [loading, setLoading] = useState(false)

  const editorRef = useRef(null)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  // Enter key listener for textarea inside Editor
  useEffect(() => {
    const textarea = editorRef.current?.querySelector("textarea")
    if (textarea) {
      const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
          e.preventDefault()
          sendPrompt()
        }
      }
      textarea.addEventListener("keydown", handleKeyDown)
      return () => textarea.removeEventListener("keydown", handleKeyDown)
    }
  }, [prompt])

  async function sendPrompt() {
    setLoading(true)
    setResponse('')
    try {
      const res = await axios.post('https://ks-backend-xyev.onrender.com/api/v1/ai/review', { prompt })
      // const res = await axios.post('http://localhost:3000/api/v1/ai/review', { prompt })
      setResponse(res.data)
    } catch (error) {
      setResponse("Error getting response from AI.")
      console.error(error)
    }
    setLoading(false)
  }

  return (
    <main className="h-screen w-full flex flex-col">
      <Navbar />
      <div className="h-[90%] w-full flex bg-green-800">
        {/* Left Panel */}
        <div ref={editorRef} className="flex-1 bg-gradient-to-b from-[#50ff73] to-[#fafcfa] text-black relative border-none">
          <div className="h-full w-full flex flex-col">
            <Editor
              value={prompt}
              onValueChange={setPrompt}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{
                fontFamily: '"Fira code", "Fira Mono", monospace',
                fontSize: 20,
                height: "100%",
                width: "100%",
              }}
            />
          </div>
          <div
            onClick={sendPrompt}
            className="absolute bottom-4 right-4 bg-gradient-to-r from-[#a561fd]/70 to-[#ff66b2]/70 text-black px-6 py-2 font-normal rounded-md cursor-pointer select-none hover:bg-indigo-200"
          >
            Send
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 bg-gradient-to-t from-[#50ff73] to-[#fafcfa] text-black p-6 overflow-auto text-lg leading-relaxed">
          {!loading && !response && (
            <div className="flex justify-center items-center">
              <img src={WImg} alt="Select Scheme" className="size-[600px]" />
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-full">
              <div className="loader ease-linear rounded-full border-16 border-t-16 border-gray-700 h-32 w-32"></div>
            </div>
          ) : (
            response && (
              <Markdown rehypePlugins={[rehypeHighlight]}>
                {response}
              </Markdown>
            )
          )}
        </div>
      </div>

      {/* Loader CSS */}
      <style>{`
        .loader {
          border-top-color: #50ff73;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  )
}

export default AIAssistant
