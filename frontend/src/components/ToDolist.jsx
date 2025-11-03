// import React, { useState } from "react";
// import { Auth } from "../Context/TodoContext";

// const ToDolist = () => {
//   const [task, setTask] = useState("");
// const {tasks,Addtask,Deletetask,Donetask,Updatetask}=Auth();
 
//   const [editIndex, setEditIndex] = useState(null);
//   const [editText, setEditText] = useState("");

//   // Add task
//   const handleAdd = () => {
//   Addtask(task)
//     setTask("");
//   };

//   // Delete task
//   // const handleDelete = (id) => {
//   //   setTasks(tasks.filter((_, i) => i !== id));
//   // };

//   // Mark Done / Undo
//   // const handleDone = (id) => {
//   //   setTasks(
//   //     tasks.map((t, i) => (i === id ? { ...t, flag: !t.flag } : t))
//   //   );
//   // };

//   // Start editing
//   const handleEdit = (task) => {
//     setEditIndex(task._id);
//     setEditText(task.text);
//   };

//   // Update edited task
//   const handleUpdate = (id) => {
//    Updatetask(id,editText)
//     setEditIndex(null);
//     setEditText("");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
//       <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-lg">
//         <h1 className="text-4xl font-bold text-center text-blue-700 mb-8">
//           📝 Modern To-Do List
//         </h1>

//         {/* Input Section */}
//         <div className="flex gap-3 mb-6">
//           <input
//             type="text"
//             placeholder="Add a new task..."
//             value={task}
//             onChange={(e) => setTask(e.target.value)}
//             className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <button
//             onClick={handleAdd}
//             className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition-all font-medium"
//           >
//             Add
//           </button>
//         </div>

//         {/* Tasks List */}
//         <ul className="space-y-3">
//           {tasks.map((t) => (
//             <li
//               key={t._id}
//               className={`flex justify-between items-center px-4 py-3 rounded-xl shadow-md transition-all ${
//                 t.flag ? "bg-green-100" : "bg-gray-50"
//               }`}
//             >
//               {editIndex === t._id ? (
//                 <div className="flex flex-1 gap-2">
//                   <input
//                     value={editText}
//                     onChange={(e) => setEditText(e.target.value)}
//                     className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                   <button
//                     onClick={() => handleUpdate(t._id)}
//                     className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600 transition-all"
//                   >
//                     Update
//                   </button>
//                 </div>
//               ) : (
//                 <>
//                   <span
//                     className={`flex-1 text-lg ${
//                       t.flag ? "line-through text-gray-500" : "text-gray-900"
//                     }`}
//                   >
//                     {t.text}
//                   </span>
//                   <div className="flex gap-2">
//                     <button
//                       onClick={() => Donetask(t._id,t.flag)}
//                       className={`px-3 py-1 rounded-lg font-medium transition-all ${
//                         t.flag
//                           ? "bg-yellow-400 text-white hover:bg-yellow-500"
//                           : "bg-green-500 text-white hover:bg-green-600"
//                       }`}
//                     >
//                       {t.flag ? "Undo" : "Done"}
//                     </button>
//                     <button
//                       onClick={() => handleEdit(t)}
//                       className="bg-purple-500 text-white px-3 py-1 rounded-lg hover:bg-purple-600 transition-all"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => Deletetask(t._id)}
//                       className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default ToDolist;

import React, { useState } from "react";
import { Auth } from "../Context/TodoContext";

const ToDolist = () => {
  const [task, setTask] = useState("");
  const { tasks, Addtask, Deletetask, Donetask, Updatetask } = Auth();

  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAdd = async () => {
    if (!task.trim()) {
      setError("Task cannot be empty");
      return;
    }
    setError("");
    setLoading(true);
    await Addtask(task);
    setTask("");
    setLoading(false);
  };

  const handleEdit = (task) => {
    setEditIndex(task._id);
    setEditText(task.text);
    setError("");
  };

  const handleUpdate = async (id) => {
    if (!editText.trim()) {
      setError("Task cannot be empty");
      return;
    }
    setError("");
    setLoading(true);
    await Updatetask(id, editText);
    setEditIndex(null);
    setEditText("");
    setLoading(false);
  };

  const handleCancelEdit = () => {
    setEditIndex(null);
    setEditText("");
    setError("");
  };

  const handleKeyPress = (e, id = null) => {
    if (e.key === 'Enter') {
      if (editIndex !== null && id) {
        handleUpdate(id);
      } else {
        handleAdd();
      }
    }
  };

  const pendingTasks = tasks.filter(t => !t.flag).length;
  const completedTasks = tasks.filter(t => t.flag).length;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md transition-all">
    
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
         To-Do List
        </h1>
        <p className="text-center text-gray-500 text-sm mb-6">
      
        </p>

      
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Add a new task..."
            value={task}
            onChange={(e) => {
              setTask(e.target.value);
              setError("");
            }}
            onKeyPress={handleKeyPress}
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          />
          <button
            onClick={handleAdd}
            disabled={loading || !task.trim()}
            className={`bg-blue-500 text-white px-4 py-2 rounded-lg transition ${
              loading || !task.trim() 
                ? "opacity-50 cursor-not-allowed" 
                : "hover:bg-blue-600"
            }`}
          >
            {loading ? "..." : "Add"}
          </button>
        </div>

     
        {error && (
          <p className="text-red-500 text-xs mb-4 text-center">{error}</p>
        )}

     
        <div className="max-h-96 overflow-y-auto pr-2">
          <ul className="space-y-3">
            {tasks.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">📝</div>
                <p className="text-gray-500 text-sm">No tasks yet</p>
                <p className="text-gray-400 text-xs mt-1">Add your first task above</p>
              </div>
            ) : (
              tasks.map((t) => (
                <li
                  key={t._id}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border shadow-sm transition-all ${
                    t.flag ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {editIndex === t._id ? (
                    <div className="flex flex-1 gap-2">
                      <input
                        value={editText}
                        onChange={(e) => {
                          setEditText(e.target.value);
                          setError("");
                        }}
                        onKeyPress={(e) => handleKeyPress(e, t._id)}
                        className="flex-1 border border-gray-300 rounded px-2 py-1 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none"
                        autoFocus
                        disabled={loading}
                      />
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleUpdate(t._id)}
                          disabled={loading}
                          className={`text-sm bg-blue-500 text-white px-3 py-1 rounded transition ${
                            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
                          }`}
                        >
                          {loading ? "..." : "Save"}
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          disabled={loading}
                          className="text-sm bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600 transition"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <span
                        className={`flex-1 text-sm font-medium break-words max-w-[180px] ${
                          t.flag ? "line-through text-gray-400" : "text-gray-800"
                        }`}
                      >
                        {t.text}
                      </span>
                      <div className="flex gap-2 text-xs flex-shrink-0">
                        <button
                          onClick={() => Donetask(t._id, t.flag)}
                          disabled={loading}
                          className={`px-2 py-1 rounded transition ${
                            t.flag
                              ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                              : "bg-green-100 text-green-700 hover:bg-green-200"
                          } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          {t.flag ? "Undo" : "Done"}
                        </button>
                        <button
                          onClick={() => handleEdit(t)}
                          disabled={loading}
                          className={`px-2 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded transition ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => Deletetask(t._id)}
                          disabled={loading}
                          className={`px-2 py-1 bg-red-100 text-red-700 hover:bg-red-200 rounded transition ${
                            loading ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))
            )}
          </ul>
        </div>

   
        {tasks.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Total: {tasks.length}</span>
              <span>Pending: {pendingTasks}</span>
              <span>Completed: {completedTasks}</span>
            </div>
            {completedTasks === tasks.length && tasks.length > 0 && (
              <p className="text-green-600 text-xs text-center mt-2 font-medium">
              All tasks completed! Great job!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToDolist;