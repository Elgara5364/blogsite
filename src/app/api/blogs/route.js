import { connectDB } from "@/app/database";
import { NextResponse } from "next/server";
import { mongo_uri } from "../../../../constant";
import { Blog } from "@/app/models/blog";

export async function GET(req) {
  // await connectDB(mongo_uri);
  // return new NextResponse("Get Blogs");

  // EXTRACTING QUERY PARAMETER
  const searchParams = req.nextUrl.searchParams;
  const limit = searchParams.get("limit") || "10"; //default limit is 10
  const page = searchParams.get("page") || "1"; //default page is 1
  const skip = (parseInt(page) - 1) * parseInt(limit); //calculate skip value

  //CONNECTING TO MONGO DB AND RETRIEVING DATA
  try {
    await connectDB(mongo_uri);
    //sorting berdasarkan date dan ketika pindah ke page berikutnya skip 10 data
    const blogs = await Blog.find()
      .sort({ date: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    const totalData = await Blog.countDocuments();

    //RETURNING RESPONSE AND ERROR HANDLING
    return NextResponse.json({
      total: totalData,
      page: page,
      limit: limit,
      data: blogs,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    await connectDB(mongo_uri);
    const { title, description, imageURL } = await req.json();

    const newBlog = new Blog({
      title: title,
      description: description,
      imageURL,
    });

    const blog = await newBlog.save();
    return NextResponse.json(
      {
        success: true,
        message: "Blog Added successfully",
        data: blog,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
