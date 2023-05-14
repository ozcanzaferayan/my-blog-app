import React from "react";
import { RouterOutputs } from "~/utils/api";
import Loading from "./Loading";

type Props = {
  posts: RouterOutputs["post"]["getUserPosts"] | undefined;
  onDelete?: (postId: string) => void;
  loading?: boolean;
};

const PostList = ({ posts, onDelete, loading }: Props) => {
  return (
    <>
      {posts &&
        posts.map((post) => (
          <div key={post.id} className="card w-96 bg-base-100 shadow-xl">
            <div className="card-body">
              <h4 className="card-title">{post.title}</h4>
              <p>
                {post.author.name} - {post.content}
              </p>
              {onDelete && (
                <div className="card-actions justify-end">
                  <button
                    className="btn-accent btn"
                    onClick={() => onDelete(post.id)}
                  >
                    Delete
                    {loading && <Loading />}
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
    </>
  );
};

export default PostList;
