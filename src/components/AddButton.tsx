"use client";

import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function AddButton() {
  return (
    <div className="post-add-button">
      <Link href="/posts/add" >
        <PlusCircleIcon width={64} />
      </Link>
    </div>
  );
}