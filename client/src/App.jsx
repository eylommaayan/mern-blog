import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout    from "./components/Layout";
import Home      from "./pages/Home";
import Blog      from "./pages/Blog";
import AddBlog   from "./pages/AddBlog";
import EditBlog  from "./pages/EditBlog";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route אב: Layout */}
        <Route element={<Layout />}>

          {/* כל מה שבפנים ירונדר בתוך Layout */}
          <Route index element={<Home />} />                 {/* "/" */}
          <Route path="blog/:id"  element={<Blog />} />
          <Route path="add-blog"  element={<AddBlog />} />
          <Route path="edit-blog/:id" element={<EditBlog />} />

          {/* אפשר להוסיף כאן עוד עמודים בעתיד */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
