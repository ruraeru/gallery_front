"use client";

import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

export default function AddButton() {
  return (
    <div className="fixed bottom-6 right-6">
      <Link href="/posts/add">
        <PlusCircleIcon className="w-12 h-12 text-primary hover:text-primary-hover transition-colors" />
      </Link>
    </div>
  );
}