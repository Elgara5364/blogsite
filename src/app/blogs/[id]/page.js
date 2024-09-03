import BlogItem from "@/components/blogs/blogItem";

async function fetchBlog({ id }) {
  try {
    const data = await fetch(`http:localhost:3000/api/blogs/${id}`, {
      cache: "no-store",
    });
    return data.json();
  } catch (error) {
    console.log(error);
  }
}
const Blog = async ({ params }) => {
  const blog = await fetchBlog(params);
  return (
    <div>
      <BlogItem blog={blog} />
    </div>
  );
};

export default Blog;
