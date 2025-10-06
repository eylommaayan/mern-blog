// src/components/BlogForm.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function BlogForm() {
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    description: "",
    image: "",
  });

  const inputStyle =
    "border border-gray-400 rounded px-4 py-3 text-base w-full focus:outline-none focus:border-gray-700";

  const handleChange = (e) =>
    setBlog({ ...blog, [e.target.name]: e.target.value });

  const onSave = async (e) => {
    e.preventDefault();

    if (!blog.title || !blog.description ) {
      return toast.error("מלא את כל השדות");
    }

    try {
      const res = await axios.post("/api/blogs", blog);
      toast.success(res?.data?.message || "Blog saved!");
      setBlog({ title: "", description: "", image: "" });
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  return (
    <form onSubmit={onSave} className="space-y-4">
      <div className="space-y-2">
        <label className="font-semibold">כותרת</label>
        <input
          name="title"
          value={blog.title}
          onChange={handleChange}
          className={inputStyle}
          placeholder="כותרת הפוסט"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="font-semibold">תיאור</label>
        <textarea
          name="description"
          value={blog.description}
          onChange={handleChange}
          className={inputStyle}
          rows={6}
          placeholder="תיאור הפוסט"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="font-semibold">URL תמונה</label>
        <input
          name="image"
          value={blog.image}
          onChange={handleChange}
     
        />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded font-semibold"
        >
          שמור בלוג
        </button>
      </div>
    </form>
  );
}
