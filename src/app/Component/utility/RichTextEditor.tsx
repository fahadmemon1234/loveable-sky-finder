"use client";

import { useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

// Dynamic import with default
const ReactQuill = dynamic(() => import("react-quill").then((mod) => mod.default), {
  ssr: false,
});

// TypeScript type for editor
type QuillEditor = {
  getEditor: () => {
    getSelection: () => { index: number; length: number } | null;
    insertEmbed: (index: number, type: string, value: string) => void;
    getLength: () => number;
  };
};

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const quillRef = useRef<any>(null);

  // Upload image helper
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data.url;
  };

  // Toolbar image handler
  const imageHandler = useCallback(async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      try {
        const url = await uploadImage(file);
        const editor = quillRef.current?.getEditor();
        if (!editor) return;

        const range = editor.getSelection();
        if (range) editor.insertEmbed(range.index, "image", url);
        else editor.insertEmbed(editor.getLength(), "image", url);
      } catch (err) {
        console.error("Image upload failed:", err);
      }
    };
  }, []);

  // Paste handler for images
  useEffect(() => {
    const editor = quillRef.current?.getEditor();
    if (!editor) return;

    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];
        if (item.type.indexOf("image") === 0) {
          e.preventDefault();
          const file = item.getAsFile();
          if (!file) continue;

          try {
            const url = await uploadImage(file);
            const range = editor.getSelection();
            if (range) editor.insertEmbed(range.index, "image", url);
            else editor.insertEmbed(editor.getLength(), "image", url);
          } catch (err) {
            console.error("Paste image upload failed:", err);
          }
        }
      }
    };

    editor.root.addEventListener("paste", handlePaste);
    return () => editor.root.removeEventListener("paste", handlePaste);
  }, []);

  const modules = {
    toolbar: {
      container: [
        [{ font: [] }, { size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ header: 1 }, { header: 2 }, "blockquote", "code-block"],
        [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
        [{ align: [] }],
        ["link", "image", "video"],
        ["clean"],
      ],
      handlers: { image: imageHandler },
    },
  };

  const formats = [
    "font", "size",
    "bold", "italic", "underline", "strike",
    "color", "background",
    "header", "blockquote", "code-block",
    "list", "bullet", "indent",
    "align",
    "link", "image", "video",
  ];


  return (
    <ReactQuill
      ref={quillRef}
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
    />
  );
}
