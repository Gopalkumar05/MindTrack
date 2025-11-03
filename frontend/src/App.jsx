import React from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import './App.css'
// import Home from './Pages/Home'
// import About from './Pages/About'
// import Header from './components/Header'
// import Card from './components/Card'
import ToDolist from './components/ToDolist'

function App() {
  
  // const list={
  //   img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/961px-Outdoors-man-portrait_%28cropped%29.jpg',
  //   name:'Gopal Kumar',
  //   age:22,
  //   batch:2025,
  //   exp:'1 year',
  //   descrip:'Passionate software engineer with experience building scalable web applications.Loves problem-solving, learning new technologies, and building user-friendly interfaces.',
  //   position:'Frontend Developer'
  // };

  return (
    <Router>
      {/* <Header/> */}
<Routes>
{/* <Route path='/' element={<Home/>}/> */}
{/* <Route path='/about' element={<About/>}/> */}
{/* <Route path='/' element={<Card list={list}/>}/> */}
<Route path='/' element={<ToDolist/>}/>


</Routes>
    </Router>
    
  )
}

export default App


// import React from 'react'
// import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
// import './App.css'
// import Home from './Pages/Home'
// import About from './Pages/About'
// import Header from './components/Header'
// import Card from './components/Card'

// function App() {
  
//   // const list={
//   //   img:'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/961px-Outdoors-man-portrait_%28cropped%29.jpg',
//   //   name:'Gopal Kumar',
//   //   age:22,
//   //   batch:2025,
//   //   exp:'1 year',
//   //   descrip:'Passionate software engineer with experience building scalable web applications.Loves problem-solving, learning new technologies, and building user-friendly interfaces.',
//   //   position:'Frontend Developer'
//   // };

//   return (
//     <Router>
//       {/* <Header/> */}
// <Routes>
// {/* <Route path='/' element={<Home/>}/> */}
// {/* <Route path='/about' element={<About/>}/> */}
// <Route path='/' element={<Card name='Gopal Kumar' age={22} postion='software developer' descrip='Passionate software engineer with experience building scalable web applications.Loves problem-solving, learning new technologies, and building user-friendly interfaces.' exp='2 year' batch={2025} img='https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Outdoors-man-portrait_%28cropped%29.jpg/961px-Outdoors-man-portrait_%28cropped%29.jpg'/>}/>


// </Routes>
//     </Router>
    
//   )
// }

// export default App
