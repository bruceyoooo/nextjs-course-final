"use client";

import { addPost } from "@/services/post";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface CommentEditorProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const CommentEditor = ({ isOpen, setIsOpen }: CommentEditorProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page") || "1";
  const router = useRouter();

  const { mutate: addPostMutate, isPending } = useMutation({
    mutationFn: addPost,
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["posts", currentPage] });
      if (currentPage !== "1") {
        router.push(`/?page=1`);
      }
    },
  });

  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const onContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const onPost = () => {
    if (isPending) return;
    if (!title || !content) {
      alert("Please fill in all fields");
      return;
    }
    addPostMutate({ title, content });
  };

  return (
    <Dialog
      open={isOpen}
      onClose={() => {}}
      transition
      className="fixed inset-0 flex w-screen items-center justify-center bg-black/30 p-4 transition duration-300 ease-out data-closed:opacity-0"
    >
      <DialogBackdrop className="fixed inset-0 bg-black/70" />
      <DialogPanel className="max-w-lg z-50 space-y-4 bg-[#131313] border border-white/10 p-4 rounded-lg">
        <DialogTitle className="font-bold text-white">
          What's on your mind?
        </DialogTitle>
        <input
          placeholder="Title"
          type="text"
          className="w-full h-[40px] border text-sm border-white/10 rounded-md p-2 focus:outline-none"
          value={title}
          onChange={onTitleChange}
        />
        <textarea
          placeholder="Comment"
          className="w-full h-[100px] border text-sm border-white/10 rounded-md p-2 focus:outline-none"
          value={content}
          onChange={onContentChange}
        />
        <div className="flex gap-4 text-sm justify-end">
          <button
            className="text-white/50 font-bold cursor-pointer"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </button>
          <button
            className="text-white font-bold cursor-pointer"
            onClick={onPost}
            disabled={isPending}
          >
            {isPending ? "Posting..." : "Post"}
          </button>
        </div>
      </DialogPanel>
    </Dialog>
  );
};

export default CommentEditor;
