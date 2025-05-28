"use client"
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Home() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState("");

  // { hashtag: string }

  const onSubmit = async ({ hashtag }) => {
    const res = await fetch("/api/hashtag", {
      method: "POST",
      body: JSON.stringify({ hashtag }),
      headers: { "Content-Type": "application/json" },
    });
    const json = await res.json();
    setData(json.data);
    setDownloadUrl(json.downloadUrl);
  };

  return (
    <main className="max-w-lg mx-auto mt-10">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("hashtag", { required: true })}
          placeholder="#YourHashtag"
          className="border p-2 w-full rounded"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>

      {data.length > 0 && (
        <>
          <h2 className="mt-6 font-semibold">Results</h2>
          <ul className="space-y-2">
            {data.map((post, i) => (
              <li key={i} className="border p-2 rounded">
                <p><strong>Title:</strong> {post.message}</p>
                <p><strong>Likes:</strong> {post.likes}</p>
                <p><strong>Comments:</strong> {post.comments}</p>
              </li>
            ))}
          </ul>

          <a href={downloadUrl} className="block mt-4 text-blue-600 underline">
            Download Excel
          </a>
        </>
      )}
    </main>
  );
}