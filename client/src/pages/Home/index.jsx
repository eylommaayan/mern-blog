// src/pages/Home.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);

  /* בקשת GET ברינדור ראשון */
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get("/api/blogs"); //  proxy→5000
        setBlogs(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
if (loading) {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="w-10 h-10 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}


  // 🔹 מצב ריק – כולל כפתור הוספה
  if (!blogs.length) {
    return (
      <section className="text-center mt-20 space-y-6">
        <p className="text-gray-700">אין בלוגים להצגה.</p>
        <Link
          to="/add-blog"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          הוסף בלוג ראשון
        </Link>
      </section>
    );
  }

  /* ─────────────────────────── UI ─────────────────────────── */
  return (
    <>
      {/* שורת כותרת + כפתור */}
      <div className="flex items-center justify-between px-6 mt-10 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">כל הבלוגים</h1>

        <Link
          to="/add-blog"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded shadow"
        >
          הוסף בלוג
        </Link>
      </div>

      {/* גריד הכרטיסים */}
      <section className="grid gap-6 px-4 sm:px-6 pb-10 sm:grid-cols-2 lg:grid-cols-3">

        {blogs.map((b) => (
          <Link
            key={b._id}
            to={`/blog/${b._id}`}
           className="border rounded overflow-hidden shadow transition duration-300 hover:shadow-xl hover:scale-[1.03] hover:border-blue-500"
          >
            {b.image && (
              <img
                src={b.image}
                alt={b.title}
                className="h-40 w-full object-cover"
              />
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{b.title}</h2>
              <p className="text-sm text-gray-600 line-clamp-3">
                {b.description}
              </p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
}
