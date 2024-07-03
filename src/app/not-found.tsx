import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="text-center min-h-screen flex justify-center flex-col">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
