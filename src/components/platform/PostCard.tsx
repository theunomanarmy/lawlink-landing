"use client";

import { useState } from "react";
import { Heart, MessageCircle, Share2, MoreVertical } from "lucide-react";

type Comment = {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
};

type Post = {
  id: string;
  author: string;
  authorAvatar?: string;
  authorTitle: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  isLiked?: boolean;
};

type PostCardProps = {
  post: Post;
  onLike: (postId: string) => void;
  onComment: (postId: string, comment: string) => void;
};

export default function PostCard({ post, onLike, onComment }: PostCardProps) {
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onComment(post.id, commentText);
      setCommentText("");
    }
  };

  return (
    <div className="rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-soft">
      <div className="flex items-start gap-4 mb-4">
        {post.authorAvatar ? (
          <img
            src={post.authorAvatar}
            alt={post.author}
            className="w-12 h-12 rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-accent-soft flex items-center justify-center">
            <span className="text-lg font-semibold text-accent">
              {post.author.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-foreground">{post.author}</h3>
              <p className="text-sm text-muted">{post.authorTitle}</p>
            </div>
            <button className="text-muted hover:text-foreground">
              <MoreVertical size={18} />
            </button>
          </div>
          <p className="text-xs text-muted mt-1">{post.timestamp}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-foreground whitespace-pre-wrap">{post.content}</p>
      </div>

      <div className="flex items-center gap-6 pt-4 border-t border-border">
        <button
          onClick={() => onLike(post.id)}
          className={`flex items-center gap-2 text-sm transition ${
            post.isLiked
              ? "text-red-500"
              : "text-muted hover:text-foreground"
          }`}
        >
          <Heart size={18} className={post.isLiked ? "fill-current" : ""} />
          <span>{post.likes}</span>
        </button>
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition"
        >
          <MessageCircle size={18} />
          <span>{post.comments.length}</span>
        </button>
        <button className="flex items-center gap-2 text-sm text-muted hover:text-foreground transition">
          <Share2 size={18} />
          <span>Share</span>
        </button>
      </div>

      {showComments && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="space-y-4 mb-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex items-start gap-3">
                {comment.authorAvatar ? (
                  <img
                    src={comment.authorAvatar}
                    alt={comment.author}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-accent-soft flex items-center justify-center">
                    <span className="text-xs font-semibold text-accent">
                      {comment.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm text-foreground">{comment.author}</span>
                    <span className="text-xs text-muted">{comment.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted mt-1">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmitComment} className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-[#8b5a3c] transition"
            >
              Post
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
