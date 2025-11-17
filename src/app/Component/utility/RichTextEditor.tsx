"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: [
    [{ font: [] }, { size: ["small", false, "large", "huge"] }], // font family & size
    ["bold", "italic", "underline", "strike"], // formatting
    [{ color: [] }, { background: [] }], // color pickers
    [{ script: "sub" }, { script: "super" }], // superscript/subscript
    [{ header: 1 }, { header: 2 }, "blockquote", "code-block"], // headings / blocks
    [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }], // lists & indent
    [{ align: [] }], // text alignment
    ["link", "image", "video"], // media
    ["clean"], // remove formatting
    ["undo", "redo"], // you can add custom handlers if needed
  ],
};

const formats = [
  "font", "size",
  "bold", "italic", "underline", "strike",
  "color", "background",
  "script",
  "header", "blockquote", "code-block",
  "list", "bullet", "indent",
  "align",
  "link", "image", "video"
];

export default function RichTextEditor({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        className="ql-container ql-snow"
      />
    </div>
  );
}
