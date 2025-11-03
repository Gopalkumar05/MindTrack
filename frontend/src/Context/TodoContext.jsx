



import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";

const API = "https://mindtrack-adme.onrender.com/api";

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
