import React, { useState } from "react";

export default function Form({ add }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    add({ title: title.trim(), description: description.trim(), priority });
    setTitle("");
    setDescription("");
    setPriority("Medium");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 space-y-4">
      <input
        type="text"
        placeholder="Task Title"
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <select
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>

      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
      >
        Add Task
      </button>
    </form>
  );
}
