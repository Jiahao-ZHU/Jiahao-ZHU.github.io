"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";

interface MdxContentProps {
  source: MDXRemoteSerializeResult;
}

export function MdxContent({ source }: MdxContentProps) {
  return (
    <div className="prose-custom">
      <MDXRemote {...source} />
    </div>
  );
}
