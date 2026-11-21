import React from "react";

export interface AvatarProps {
  src?: string;
  size?: "xs" | "s" | "m" | "l" | "xl";
  alt?: string;
  "aria-label"?: string;
  className?: string;
  style?: React.CSSProperties;
}

const sizeMap: Record<NonNullable<AvatarProps["size"]>, string> = {
  xs: "w-6 h-6 text-xs",
  s: "w-8 h-8 text-xs",
  m: "w-10 h-10 text-sm",
  l: "w-16 h-16 text-base",
  xl: "w-36 h-36 sm:w-40 sm:h-40 text-xl",
};

export const Avatar: React.FC<AvatarProps> = ({
  src,
  size = "m",
  alt,
  className = "",
  style,
  ...props
}) => {
  const label = alt || props["aria-label"] || "Avatar";
  return (
    <div
      style={style}
      aria-label={label}
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-border-strong bg-surface-elevated shadow-sm ${sizeMap[size]} ${className}`.trim()}
    >
      {src ? (
        <img
          src={src}
          alt={label}
          className="h-full w-full object-cover"
        />
      ) : (
        <span className="font-semibold text-brand">{label.charAt(0).toUpperCase()}</span>
      )}
    </div>
  );
};

export interface AvatarGroupProps {
  avatars: Array<{ src: string; "aria-label"?: string }>;
  size?: "xs" | "s" | "m" | "l";
  reverse?: boolean;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  size = "m",
  reverse = false,
}) => {
  const list = reverse ? [...avatars].reverse() : avatars;
  return (
    <div className="flex items-center -space-x-2.5">
      {list.map((avatar, index) => (
        <Avatar
          key={`${avatar.src}-${index}`}
          src={avatar.src}
          size={size}
          aria-label={avatar["aria-label"]}
          className="ring-2 ring-page transition-transform hover:-translate-y-0.5 hover:z-10"
        />
      ))}
    </div>
  );
};
