"use client";

import { useState } from "react";

export function ProfileAvatar({
  avatar,
  displayName,
}: {
  avatar: string;
  displayName: string;
}) {
  const [isBroken, setIsBroken] = useState(false);

  if (isBroken) return null;

  return (
    <div className="shrink-0 border-r border-edge">
      <div className="mx-[0.5px] my-[3px] size-32 overflow-hidden rounded-full ring-1 ring-border ring-offset-2 ring-offset-background sm:size-40">
        <img
          className="size-32 scale-110 rounded-full object-cover object-center select-none sm:size-40"
          alt={`${displayName}'s avatar`}
          src={avatar}
          fetchPriority="high"
          onError={() => setIsBroken(true)}
        />
      </div>
    </div>
  );
}
