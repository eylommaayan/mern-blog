// src/pages/EditBlog.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", image: "" });

  // טעינת הערכים הקיימים
  useEffect(() => {
    axios.get(`/api/blogs/${id}`).then(({ data }) => setForm(data));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/blogs/${id}`, form);
      toast.success("עודכן!");
      navigate(`/blog/${id}`);
    } catch (err) {
      toast.error("שגיאה בעדכון");
    }
  };

  return (
    <section className="max-w-xl mx-auto px-6 py-10 space-y-6">
      <h1 className="text-2xl font-bold mb-4">עריכת בלוג</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input name="title" value={form.title} onChange={handleChange} placeholder="כותרת" className="w-full border p-2 rounded" required />
        <textarea name="description" value={form.description} onChange={handleChange} rows={6} placeholder="תיאור" className="w-full border p-2 rounded" required />
        <input name="image" value={form.image} onChange={handleChange} placeholder="URL תמונה" className="w-full border p-2 rounded" />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">שמור</button>
      </form>
    </section>
  );
}
