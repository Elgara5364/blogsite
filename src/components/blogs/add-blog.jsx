"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

const AddBlog = ({ title, description, blog, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const initialState = {
    title: "",
    description: "",
    imageURL: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (blog) {
      setFormData({
        title: blog.title,
        description: blog.description,
        imageURL: blog.imageURL,
      });
    }
  }, [blog]);

  const inputValuetoFormData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const router = useRouter();
  const addArticle = async () => {
    //fetch API
    try {
      const res =
        //VALIDASI ANTARA POST DAN PUT
        blog !== null && blog !== undefined
          ? await fetch(`http://localhost:3000/api/blogs/${blog._id}`, {
              method: "PUT",
              body: JSON.stringify(formData),
            })
          : await fetch(`http://localhost:3000/api/blogs`, {
              method: "POST",
              body: JSON.stringify(formData),
            });

      const result = await res.json();

      //VALIDASI BERHASIL EDIT ATAU ADD
      if (result?.success) {
        toast({ title: "Berhasil", description: "Halaman Diperbarui" });
        setIsOpen(false);
        setFormData(initialState);
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      setFormData(initialState);
      toast({ title: "Gagal", description: "Gagal Menambah blog" });
    }
  };

  return (
    <div>
      <div
        className="hover:bg-accent rounded-sm duration-150"
        onClick={() => setIsOpen(true)}>
        {children}
      </div>
      <Dialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={inputValuetoFormData}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={inputValuetoFormData}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="imageURL" className="text-right">
                Image URL
              </Label>
              <input
                id="imageURL"
                name="imageURL"
                value={formData.imageURL}
                onChange={inputValuetoFormData}
                className="col-span-3 bg-transparent ring-1 ring-slate-800 rounded-md"
              />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={addArticle} type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddBlog;
