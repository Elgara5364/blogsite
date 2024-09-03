import { connectDB } from "@/app/database";
import { NextResponse } from "next/server";
import { mongo_uri } from "../../../../../constant";
import { Blog } from "@/app/models/blog";

export async function GET(req, { params }) {
  try {
    await connectDB(mongo_uri);

    const blog = await Blog.findById(params.id);
    return NextResponse.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return NextResponse.json(
        {
          success: false,
          message: " Source Not Found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
export async function DELETE(req, { params }) {
  try {
    await connectDB(mongo_uri);
    await Blog.deleteOne({ _id: params.id });
    return NextResponse.json({
      success: true,
      message: "Successfully delete",
    });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return NextResponse.json(
        {
          success: false,
          message: " Source Not Found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
export async function PUT(req, { params }) {
  try {
    await connectDB(mongo_uri);
    const { title, description, imageURL } = await req.json();
    const blog = await Blog.findOne({ _id: params.id }); //cari artikel sesuai id

    blog.title = title;
    blog.description = description;
    blog.imageURL = imageURL;

    const updatedBlog = await blog.save();

    return NextResponse.json({
      success: true,
      message: "Successfully updated",
      data: updatedBlog,
    });
  } catch (error) {
    if (error.name === "CastError" && error.kind === "ObjectId") {
      return NextResponse.json(
        {
          success: false,
          message: " Source Not Found",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}
