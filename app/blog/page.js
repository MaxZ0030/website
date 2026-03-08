"use client";
import Link from "next/link";
import "../globals.css";

export default function BlogPage() {
  const posts = [
    {
      id: 3,
      title: "How To Get Your Game To Be Popular",
      summary:
        "A short history, and what makes certain games stand out today.",
      slug: "HowToGetYourGameToBePopular",
    },
    {
      id: 2,
      title: "The Learning Curve in Games",
      summary:
        "Why games make learning feel natural, and what that can teach us about design.",
      slug: "TheLearningCurveInGames",
    },
    {
      id: 1,
      title: "The Runback: Just One More Time",
      summary:
        "That addictive feeling of just one more try, and how games convince you to keep coming back.",
      slug: "TheRunbackJustOneMoreTime",
    },
  ];

  return (
    <>
      {posts.map((post) => (
        <Link
          key={post.id}
          href={`/blog/${post.slug}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <div className="project-card" style={{ marginBottom: "2rem", cursor: "pointer" }}>
            <h2>{post.title}</h2>

            <p style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}>
              {post.summary}
            </p>
          </div>
        </Link>
      ))}
    </>
  );
}