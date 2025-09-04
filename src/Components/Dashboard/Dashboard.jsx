import React, { useState, useEffect } from "react";
import Form from "../Form";
import List from "../List";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const defaultTasks = [
    {
      id: 1,
      title: "Welcome Task",
      description: "This is your first default task 🎉",
      priority: "Medium",
    },
    {
      id: 2,
      title: "Second Task",
      description: "Here’s another default task ✅",
      priority: "Low",
    },
  ];

  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved) {
      setProducts(JSON.parse(saved));
    } else {
      setProducts(defaultTasks);
      localStorage.setItem("products", JSON.stringify(defaultTasks));
    }
  }, []);

  useEffect(() => {
    if (products.length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  const addProduct = (product) => {
    const newItem = { ...product, id: Date.now() };
    setProducts((prev) => [...prev, newItem]);
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const editProduct = (id, updated) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  // فلترة + بحث
  const filteredProducts = products.filter((p) => {
    const matchPriority = filter === "All" || p.priority === filter;
    const matchSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    return matchPriority && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
          <FontAwesomeIcon icon="calendar-check" className="text-blue-500" />
          Task Manager
        </h2>

        {/* Search + Filter */}
        <div className="mb-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <input
            type="text"
            placeholder="Search . . ."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className=" border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600"></label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        {/* Form */}
        <Form add={addProduct} />

        {/* List */}
        <List
          products={filteredProducts}
          deleteProduct={deleteProduct}
          editProduct={editProduct}
        />
      </div>
    </div>
  );
}
