"use client";

import { useState } from "react";
import PostCard from "./PostCard";
import { Image, Paperclip } from "lucide-react";

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

const mockPosts: Post[] = [
  {
    id: "1",
    author: "Sarah Johnson",
    authorTitle: "Corporate Lawyer | 10 years experience",
    content: "Just wrapped up an interesting case on intellectual property rights in the tech sector. The landscape is changing rapidly with AI developments. What are your thoughts on how IP law needs to evolve?",
    timestamp: "2 hours ago",
    likes: 24,
    comments: [
      {
        id: "c1",
        author: "Michael Chen",
        content: "Great point! I think we need clearer guidelines on AI-generated content.",
        timestamp: "1 hour ago",
      },
    ],
    isLiked: false,
  },
  {
    id: "2",
    author: "David Martinez",
    authorTitle: "Tax Attorney | 15 years experience",
    content: "New tax regulations coming into effect next quarter. Here's a summary of what you need to know:\n\n• Changes to capital gains tax\n• Updated deduction limits\n• New reporting requirements\n\nHappy to discuss if anyone has questions!",
    timestamp: "5 hours ago",
    likes: 42,
    comments: [
      {
        id: "c2",
        author: "Emily Rodriguez",
        content: "Thanks for sharing! This is really helpful.",
        timestamp: "3 hours ago",
      },
      {
        id: "c3",
        author: "Robert Kim",
        content: "Do these apply to international clients as well?",
        timestamp: "2 hours ago",
      },
    ],
    isLiked: true,
  },
  {
    id: "3",
    author: "Jennifer Lee",
    authorTitle: "Immigration Lawyer | 8 years experience",
    content: "Looking for recommendations on immigration software tools. What platforms are you all using for case management?",
    timestamp: "1 day ago",
    likes: 18,
    comments: [
      {
        id: "c4",
        author: "Thomas Anderson",
        content: "I've been using CaseMaster Pro - it's been great for tracking deadlines.",
        timestamp: "20 hours ago",
      },
    ],
    isLiked: false,
  },
];

export default function HomeFeed() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [postContent, setPostContent] = useState("");

  const handleLike = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleComment = (postId: string, comment: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: "You",
      content: comment,
      timestamp: "Just now",
    };

    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...post.comments, newComment],
            }
          : post
      )
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (postContent.trim()) {
      const newPost: Post = {
        id: `post-${Date.now()}`,
        author: "You",
        authorTitle: "Lawyer",
        content: postContent,
        timestamp: "Just now",
        likes: 0,
        comments: [],
        isLiked: false,
      };
      setPosts([newPost, ...posts]);
      setPostContent("");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Create Post Form */}
      <div className="rounded-2xl border border-border/70 bg-surface/95 p-6 shadow-soft mb-6">
        <form onSubmit={handleCreatePost} className="space-y-4">
          <textarea
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)}
            placeholder="Share your thoughts, insights, or questions with the community..."
            rows={4}
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
          />
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 text-muted hover:text-foreground hover:bg-accent-soft rounded-lg transition"
                title="Add image"
              >
                <Image size={20} />
              </button>
              <button
                type="button"
                className="p-2 text-muted hover:text-foreground hover:bg-accent-soft rounded-lg transition"
                title="Add attachment"
              >
                <Paperclip size={20} />
              </button>
            </div>
            <button
              type="submit"
              className="rounded-full bg-accent px-6 py-2 text-white font-semibold shadow-soft transition hover:bg-[#8b5a3c] disabled:opacity-50"
              disabled={!postContent.trim()}
            >
              Post
            </button>
          </div>
        </form>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={handleLike}
            onComment={handleComment}
          />
        ))}
      </div>
    </div>
  );
}

