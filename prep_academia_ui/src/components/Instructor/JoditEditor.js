import React, { useRef, useState } from "react";
import JoditEditor from "jodit-react";
import axios from "axios";

const JoditEditorComponent = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

  const config = {
    readonly: false,
    uploader: {
      insertImageAsBase64URI: true,
    },
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/notes/", {
        title: "My Note Title",
        content: content,  // Send the rich-text content to the backend
      });

      console.log("Note created:", response.data);
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onChange={handleContentChange}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default JoditEditorComponent;
