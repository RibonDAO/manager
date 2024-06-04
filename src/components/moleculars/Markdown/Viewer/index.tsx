import React from "react";
import MDEditor from "@uiw/react-md-editor";

type Props = {
  value: string;
};

export default function MarkdownViewer({ value }: Props) {
  return (
    <MDEditor.Markdown
      source={value}
      style={{ backgroundColor: "transparent" }}
    />
  );
}
