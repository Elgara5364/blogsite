import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateString } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const BlogList = ({ blogs }) => {
  // console.log(blogs.data[0].createdAt);
  return (
    <div className="px-8 grid grid-cols-4 max-w-fit gap-4 mx-auto">
      {blogs.data.map((data, idx) => (
        <div key={idx} className="max-w-[15rem]">
          <Card>
            <CardHeader className="p-2 mb-3">
              <Image
                src={data.imageURL}
                alt="thumbnails"
                width={250}
                height={250}
                className="rounded-xl w-full h-40 object-fill object-top"
              />
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <Link
                href={`/blogs/${data._id}`}
                className="hover:underline duration-500 ease-in-out">
                <CardTitle className="line-clamp-1 py-1">
                  {data.title}
                </CardTitle>
              </Link>
              <CardDescription className="line-clamp-2">
                {data.description}
              </CardDescription>
              <DateString date={blogs.data[idx].createdAt} idx={idx} />
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
