// import React,{ useContext,createContext,useState,useEffect } from "react";

// import axios from 'axios'
// const API = "http://localhost:5000/api";

// const ToDolistContext=createContext();

// export const Auth=()=>{
//     const context=useContext(ToDolistContext);

//     if(!context) {
//         throw new Error("Not Access OutSide the Context")
//     }
//     return context;
// }


// export const AuthProvider=({children})=>{
//  const [tasks, setTasks] = useState([]);



// useEffect(() => {
//   fetchall();
// }, []);



// const fetchall = async ()=>{
// try {
//   const res = await axios.get(`${API}/all`);
//   setTasks(res.data)
// } catch (error) {
//   console.error(error)
// }

// }



//   const Addtask = async(text) => {
// try {
//  if(text.trim()==="") return;
//     setTasks([...tasks, { text, flag: false }]);
// await axios.post(`${API}/add`,{text})
  
//    fetchall()
  
  
// } catch (error) {
//     console.error(error)
// }

//   }

//     const Deletetask = async (id) => {

//     try {
//     // ✅ remove immediately from UI
//     setTasks(tasks.filter((task) => task._id !== id));

//     await axios.delete(`${API}/delete/${id}`);
//     fetchall(); // ✅ confirm state sync
//   } catch (error) {
//     console.error(error);
//   }
//   };

//   //  const Donetask = (id) => {
//   //   setTasks(
//   //     tasks.map((t, i) => (i === id ? { ...t, flag: !t.flag } : t))
//   //   );
//   // };

//   const Donetask = async (id, currentFlag) => {
//   try {
//     await axios.put(`${API}/update/${id}`, { flag: !currentFlag }); // ✅ update on server
//     fetchall(); // ✅ refresh from DB
//   } catch (error) {
//     console.error(error);
//   }
// };


//   //  const Updatetask = (id,editText) => {
//   //   setTasks(
//   //     tasks.map((t, i) => (i === id ? { ...t, text: editText } : t))
//   //   );

//   // };

//   const Updatetask = async (id, editText) => {
//   try {
//     if (editText.trim() === "") return;

//     await axios.put(`${API}/update/${id}`, { text: editText }); // ✅ update server

//     fetchall(); // ✅ refresh from DB
//   } catch (error) {
//     console.error(error);
//   }
// };



// const value={tasks,Addtask,Deletetask,Donetask,Updatetask,setTasks}
//     return <ToDolistContext.Provider value={value}>
//         {children}
//     </ToDolistContext.Provider>
// }




import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const API = "http://localhost:5000/api";

const ToDolistContext = createContext();

export const Auth = () => {
  const context = useContext(ToDolistContext);
  if (!context) throw new Error("Not Access Outside the Context");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const res = await axios.get(`${API}/all`);
      setTasks(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const Addtask = async (text) => {
    try {
      if (text.trim() === "") return;
      await axios.post(`${API}/add`, { text });
      fetchAll();
    } catch (error) {
      console.error(error);
    }
  };

  const Deletetask = async (id) => {
    try {
      await axios.delete(`${API}/delete/${id}`);
      fetchAll();
    } catch (error) {
      console.error(error);
    }
  };

  const Donetask = async (id, flag) => {
    try {
      await axios.put(`${API}/update/${id}`, { flag: !flag });
      fetchAll();
    } catch (error) {
      console.error(error);
    }
  };

  const Updatetask = async (id, text) => {
    try {
      if (text.trim() === "") return;
      await axios.put(`${API}/update/${id}`, { text });
      fetchAll();
    } catch (error) {
      console.error(error);
    }
  };

  const value = { tasks, Addtask, Deletetask, Donetask, Updatetask };
  return (
    <ToDolistContext.Provider value={value}>
      {children}
    </ToDolistContext.Provider>
  );
};
