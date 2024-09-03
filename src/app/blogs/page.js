import BlogList from "@/components/blogs/blogList";

async function fetchBlogs() {
  try {
    const data = await fetch(`http:localhost:3000/api/blogs`, {
      cache: "no-store",
    });
    return data.json();
  } catch (error) {
    console.log(error);
  }
}

const Blogs = async () => {
  const blogs = await fetchBlogs();

  return (
    <section>
      <div></div>
      <BlogList blogs={blogs} />
    </section>
  );
};

export default Blogs;
