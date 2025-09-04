import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const List = ({ products, deleteProduct, editProduct }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    priority: "Medium",
  });

  const startEdit = (p) => {
    setEditingId(p.id);
    setEditData({
      title: p.title,
      description: p.description,
      priority: p.priority,
    });
  };

  const handleSave = () => {
    if (!editData.title.trim() || !editData.description.trim()) return;
    editProduct(editingId, {
      title: editData.title.trim(),
      description: editData.description.trim(),
      priority: editData.priority,
    });
    setEditingId(null);
  };

  if (!products || products.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-6 text-lg">
        🚫 No tasks found
      </p>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow rounded-xl p-5 border border-gray-200"
        >
          {editingId === product.id ? (
            <>
              <input
                type="text"
                className="w-full border rounded-lg p-2 mb-2"
                value={editData.title}
                onChange={(e) =>
                  setEditData({ ...editData, title: e.target.value })
                }
              />
              <textarea
                className="w-full border rounded-lg p-2 mb-2"
                value={editData.description}
                onChange={(e) =>
                  setEditData({ ...editData, description: e.target.value })
                }
              />
              <select
                className="w-full border rounded-lg p-2 mb-3"
                value={editData.priority}
                onChange={(e) =>
                  setEditData({ ...editData, priority: e.target.value })
                }
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <div className="flex justify-between">
                <button
                  onClick={handleSave}
                  className="px-3 py-1 bg-green-500 text-white rounded-lg"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="px-3 py-1 bg-gray-400 text-white rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h3 className="text-lg font-bold mb-2">{product.title}</h3>
              <p className="text-gray-600 mb-2">{product.description}</p>
              <span
                className={`inline-block px-3 py-1 text-sm rounded-full ${
                  product.priority === "High"
                    ? "bg-red-200 text-red-700"
                    : product.priority === "Medium"
                    ? "bg-yellow-200 text-yellow-700"
                    : "bg-green-200 text-green-700"
                }`}
              >
                {product.priority}
              </span>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => startEdit(product)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg"
                >
                  <FontAwesomeIcon icon="pen" /> Edit
                </button>
                <button
                  onClick={() => deleteProduct(product.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg"
                >
                  <FontAwesomeIcon icon="trash" /> Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
