import React, { useState } from "react";
import Loading from "./Loading";

type Props = {
  onSave: (post: {
    title: string;
    content: string;
    published: boolean;
  }) => void;
  loading: boolean;
};

const PostEditor = ({ onSave, loading }: Props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [publish, setPublish] = useState(false);
  return (
    <div className="flex max-w-xs flex-col gap-2">
      <div className="form-control">
        <input
          type="text"
          placeholder="Title"
          className="input-bordered input w-full max-w-xs"
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="form-control">
        <textarea
          className="textarea-bordered textarea"
          placeholder="Content"
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer">
          <span className="label-text">Publish?</span>
          <input
            type="checkbox"
            checked
            className="checkbox-primary checkbox"
            onChange={(e) => setPublish(e.target.checked)}
          />
        </label>
      </div>
      <button
        className="btn-primary btn"
        disabled={loading}
        onClick={() => {
          onSave({
            title: title,
            content: content,
            published: publish,
          });
          setTitle("");
          setContent("");
        }}
      >
        Submit
        {loading && <Loading />}
      </button>
    </div>
  );
};

export default PostEditor;
