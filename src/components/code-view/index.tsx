import "./code-theme.css";

import Prism from "prismjs";
import { useEffect } from "react";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-jsx";

import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";

interface Props {
  code: string;
  lang: string;
}

export const CodeView = ({ code, lang }: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <>
      <pre className="bg-transparent border-none rounded-none m-0 text-xs p-2">
        <code className={`language-${lang}`}>{code}</code>
      </pre>
    </>
  );
};
