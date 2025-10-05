import BlogForm from "../../components/blogForm"


function AddBlog() {
  return (
    <div className="flex flex-col gap-10 p-10">
    <h1 className="text-2xl font-bold  ">עמוד הוספת בלוג</h1>
    <hr/>
    <BlogForm/>
    </div>
  )
}

export default AddBlog