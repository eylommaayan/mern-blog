// client/src/pages/Blog/index.jsx
import { useEffect, useState, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function Blog() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog]   = useState(null);
  const [loading, setLoading] = useState(false);

  /* ───── הבאת בלוג יחיד ───── */
  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/api/blogs/${id}`);
      setBlog(data);                // data הוא הבלוג
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  }, [id]);

  /* ───── מחיקה ───── */
  const handleDelete = async () => {
    if (!confirm("למחוק את הבלוג לצמיתות?")) return;
    try {
      await axios.delete(`/api/blogs/${id}`);
      toast.success("הבלוג נמחק");
      navigate("/");
    } catch (err) {
      toast.error("שגיאה במחיקה");
    }
  };

  useEffect(() => { getData(); }, [getData]);

  if (loading) return <p className="text-center mt-20">⏳ טוען…</p>;
  if (!blog)   return <p className="text-center mt-20">לא נמצא בלוג להצגה.</p>;

  return (
    <article className="max-w-3xl mx-auto px-6 py-10 space-y-6">
      {/* כותרת + כפתורים */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{blog.title}</h1>

        <div className="flex gap-3">
       <Link
  to={`/edit-blog/${id}`}
  className="bg-yellow-500 hover:bg-yellow-600 transition text-white px-4 py-2 rounded shadow-sm"
>
  Edit
</Link>
          <button
            onClick={handleDelete}
            className="border border-red-500 text-red-600 hover:bg-red-50 px-4 py-2 rounded"
          >
            Delete
          </button>
          <button
            onClick={() => navigate("/")}
            className="border border-gray-400 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </div>

      {/* תמונה */}
      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full max-w-md mx-auto object-cover rounded"
        />
      )}

      {/* תיאור */}
      <p className="leading-7 whitespace-pre-line text-gray-700">
        {blog.description}
      </p>
    </article>
  );
}
