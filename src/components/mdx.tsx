import { MDXRemote, MDXRemoteProps } from "next-mdx-remote/rsc";
import React, { ReactNode } from "react";
import { slugify as transliterate } from "transliteration";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

import { HeadingLink } from "@/components/HeadingLink";
import { CodeBlock, InlineCode } from "@/components/ui/CodeBlock";
import {
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  SmartLink,
} from "@/components/ui/MDXWidgets";
import { Button } from "@/components/ui/Button";
import { Media, type MediaProps } from "@/components/ui/Media";
import { Icon } from "@/components/ui/Icon";

type CustomLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

function CustomLink({ href, children, ...props }: CustomLinkProps) {
  return (
    <SmartLink href={href} {...props}>
      {children}
    </SmartLink>
  );
}

function createImage({ alt, src, ...props }: MediaProps & { src: string }) {
  if (!src) return null;
  return (
    <Media
      enlarge
      alt={alt}
      src={src}
      className="my-6"
      {...props}
    />
  );
}

function slugify(str: string): string {
  const text = typeof str === "string" ? str : String(str ?? "");
  const strWithAnd = text.replace(/&/g, " and ");
  return transliterate(strWithAnd, {
    lowercase: true,
    separator: "-",
  }).replace(/\-\-+/g, "-");
}

function createHeading(as: "h1" | "h2" | "h3" | "h4" | "h5" | "h6") {
  const CustomHeading = ({ children, ...props }: { children: ReactNode }) => {
    const slug = slugify(typeof children === "string" ? children : "section");
    return (
      <HeadingLink as={as} id={slug} {...props}>
        {children}
      </HeadingLink>
    );
  };
  CustomHeading.displayName = `${as}`;
  return CustomHeading;
}

function createParagraph({ children }: { children: ReactNode }) {
  return (
    <p className="my-3.5 text-base leading-[1.8] text-fg-muted">
      {children}
    </p>
  );
}

function createInlineCode({ children }: { children: ReactNode }) {
  return <InlineCode>{children}</InlineCode>;
}

function createCodeBlock(props: any) {
  if (props.children && props.children.props && props.children.props.className) {
    const { className, children } = props.children.props;
    const language = className.replace("language-", "");
    const label = language.charAt(0).toUpperCase() + language.slice(1);

    return (
      <CodeBlock
        codes={[
          {
            code: String(children ?? ""),
            language,
            label,
          },
        ]}
        copyButton={true}
      />
    );
  }
  return <pre className="my-4 overflow-x-auto rounded-xl bg-neutral-950 p-4 text-xs text-neutral-100" {...props} />;
}

function createList(as: "ul" | "ol") {
  const ListTag = as;
  return ({ children }: { children: ReactNode }) => (
    <ListTag
      className={`my-4 space-y-2 pl-6 text-fg-muted ${
        as === "ol" ? "list-decimal" : "list-disc marker:text-brand"
      }`}
    >
      {children}
    </ListTag>
  );
}

function createListItem({ children }: { children: ReactNode }) {
  return <li className="leading-[1.75]">{children}</li>;
}

function createHR() {
  return <hr className="my-8 border-border-strong" />;
}

const components = {
  p: createParagraph as any,
  h1: createHeading("h1") as any,
  h2: createHeading("h2") as any,
  h3: createHeading("h3") as any,
  h4: createHeading("h4") as any,
  h5: createHeading("h5") as any,
  h6: createHeading("h6") as any,
  img: createImage as any,
  a: CustomLink as any,
  code: createInlineCode as any,
  pre: createCodeBlock as any,
  ol: createList("ol") as any,
  ul: createList("ul") as any,
  li: createListItem as any,
  hr: createHR as any,
  CodeBlock,
  InlineCode,
  Accordion,
  AccordionGroup,
  Table,
  Feedback,
  Button,
  Icon,
  Media,
  SmartLink,
};

type CustomMDXProps = MDXRemoteProps & {
  components?: typeof components;
};

export function CustomMDX(props: CustomMDXProps) {
  return (
    <MDXRemote
      options={{
        blockJS: false,
        mdxOptions: {
          remarkPlugins: [[remarkMath, { singleDollarTextMath: false }]],
          rehypePlugins: [rehypeKatex],
        },
      }}
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  );
}
