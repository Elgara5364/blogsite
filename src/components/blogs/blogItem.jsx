import Image from "next/image";
import Link from "next/link";
import { EditDelete } from "./edit-delete";

const BlogItem = ({ blog }) => {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container px-6 py-10 mx-auto">
        <div className="mt-8 lg:-mx-6 lg:flex lg:items-center">
          <Image
            className="object-fill object-top w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96"
            width={500}
            height={500}
            src={blog.data.imageURL}
            alt=""
          />
          <div className="mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 ">
            <div className="flex justify-between">
              <p className="text-sm text-blue-500 uppercase">category</p>
              <EditDelete blog={blog.data} />
            </div>
            <Link
              href="#"
              className="block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white md:text-3xl">
              {blog.data.title}
            </Link>

            <p className="mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm">
              {blog.data.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogItem;
