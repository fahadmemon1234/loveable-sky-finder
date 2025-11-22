"use client";

import { useRef, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

// Dynamic import (required for Next.js)
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichTextEditor({ value, onChange }: RichTextEditorProps) {
  const editorRef = useRef<any>(null);

  // Save editor instance safely
  const handleEditorLoad = (editor: any) => {
    editorRef.current = editor;
  };

  // Upload image
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/upload-image`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    return res.data.url;
  };

  // Image button click handler
  const imageHandler = useCallback(async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;

      const editor = editorRef.current;
      if (!editor) return;

      const url = await uploadImage(file);
      const range = editor.getSelection();

      editor.insertEmbed(range?.index || editor.getLength(), "image", url);
    };
  }, []);

  // Paste image handler
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;

    const handlePaste = async (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (const item of items) {
        if (!item.type.startsWith("image")) continue;

        e.preventDefault();

        const file = item.getAsFile();
        if (!file) continue;

        const url = await uploadImage(file);
        const range = editor.getSelection();

        editor.insertEmbed(range?.index || editor.getLength(), "image", url);
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
      handlers: {
        image: imageHandler,
      },
    },
  };

  const formats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "header",
    "blockquote",
    "code-block",
    "list",
    "bullet",
    "indent",
    "align",
    "link",
    "image",
    "video",
  ];

  return (
    <ReactQuill
      theme="snow"
      value={value}
      onChange={onChange}
      modules={modules}
      formats={formats}
      onBlur={(_, __, editor) => handleEditorLoad(editor)}
    />
  );
}
