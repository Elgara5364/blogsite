"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useParams, useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import AddBlog from "./add-blog";

export function EditDelete({ blog }) {
  const params = useParams();
  const router = useRouter();

  const { toast } = useToast();
  const deleteArticle = async ({ id }) => {
    try {
      const res = await fetch(`http://localhost:3000/api/blogs/${id}`, {
        method: "DELETE",
      });

      const result = await res.json();

      //validasi jika berhasil / gagal apa selanjutnya?
      if (result?.success) {
        router.replace("/blogs");
        router.refresh();
        toast({ title: "Berhasil", description: "Berhasil menghapus blog" });
      }
    } catch (error) {
      console.error(error.message);
      toast({ title: "Gagal", description: "Gagal menghapus blog" });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenu>
          <AddBlog
            blog={blog}
            title="Edit Blog"
            description="Update your blog and saved to see change">
            <button className="pl-2 cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
              Edit
            </button>
          </AddBlog>
          <DropdownMenuItem onClick={() => deleteArticle(params)}>
            Delete
          </DropdownMenuItem>
        </DropdownMenu>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
