declare module 'rehype-katex';
declare module 'gray-matter';
declare module 'katex' {
  export function renderToString(
    tex: string,
    options?: {
      displayMode?: boolean;
      throwOnError?: boolean;
      strict?: boolean | string;
    },
  ): string;
}
