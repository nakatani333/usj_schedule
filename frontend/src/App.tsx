// import * as React from 'react'
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom'
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { createGlobalStyle } from 'styled-components'
import ShowList from './pages/ShowList.tsx'
// import { edit } from './page/showList.tsx'
import Schedule from './pages/Schedule.tsx'

const GlobalStyle = createGlobalStyle`
  body * {
      box-sizing:border-box;
    }
  `

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <GlobalStyle />
      <Router>
        <Routes>
          {/* showリストのページ */}
          <Route path="/" element={<ShowList />} />
          {/* スケジュール表示ページ */}
          <Route path="/schedule" element={<Schedule />} />
          {/* Todo編集のページ */}
          {/* <Route path="/edit/:id" element={<edit />} /> */}

        </Routes>
      </Router>
    </>

    //     <>
    //       <div>
    //         <a href="https://vite.dev" target="_blank">
    //           <img src={viteLogo} className="logo" alt="Vite logo" />
    //         </a>
    //         <a href="https://react.dev" target="_blank">
    //           <img src={reactLogo} className="logo react" alt="React logo" />
    //         </a>
    //       </div>
    //       <h1>Vite + React</h1>
    //       <div className="card">
    //         <button onClick={() => setCount((count) => count + 1)}>
    //           count is {count}
    //         </button>
    //         <p>
    //           Edit <code>src/App.tsx</code> and save to test HMR
    //         </p>
    //       </div>
    //       <p className="read-the-docs">
    //         Click on the Vite and React logos to learn more
    //       </p>
    //     </>
  )
}

export default App
