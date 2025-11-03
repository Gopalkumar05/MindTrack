import Todo from "../models/Todo.js";

// ➕ Add Task
export const addTodo = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ msg: "Text field is required" });
  }

  try {
    const todo = new Todo({ text });
    const saved = await todo.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Get All Tasks
export const getAllTodos = async (req, res) => {
  try {
    const tasks = await Todo.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✏️ Update Task
export const updateTodo = async (req, res) => {
  const { text, flag } = req.body;

  try {
    const task = await Todo.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (text !== undefined) task.text = text;
    if (flag !== undefined) task.flag = flag;

    const updated = await task.save();
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ❌ Delete Task
export const deleteTodo = async (req, res) => {
  try {
    const task = await Todo.findByIdAndDelete(req.params.id);

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully!" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
