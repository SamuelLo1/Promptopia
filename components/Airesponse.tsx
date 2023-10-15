import React, { useState } from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const AiResponse = ({ response, prompt }) => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (index, copyCode) => {
    setCopiedIndex(index);
    navigator.clipboard.writeText(copyCode);
    setTimeout(() => setCopiedIndex(null), 3000);
  };

  SyntaxHighlighter.registerLanguage('jsx', jsx);
  const parts = response.split(/(```\w+\n[\s\S]+?```)/);

  const renderPart = (part, index) => {
    if (part.startsWith('```')) {
      const [, language, code] = /```(\w+)\n([\s\S]+?)```/.exec(part);
      return (
        <div key={index} className="block rounded-md text-center dark:bg-neutral-600">
          <div
            onClick={() => handleCopy(index, code)}
            className={`justify-center border-b-2  hover:border-white px-6 ${
              copiedIndex === index ? 'dark:border-green-600 hover:dark:border-green-600' : ''
            }`}
          >
            <p className={`text-center text-white text-sm ${copiedIndex === index ? 'cursor-not-allowed text-green-500' : 'cursor-pointer'}`}>
              {copiedIndex === index ? 'Copied ✔' : 'Copy'}
            </p>
          </div>
          <SyntaxHighlighter language={language} style={coldarkDark} className="overflow-auto rounded-md shadow-md">
            {code}
          </SyntaxHighlighter>
        </div>
      );
    }
    const textWithLineBreaks = part.split('\n').map((line, i) => (
      <React.Fragment key={i}>{line}<br /></React.Fragment>
    ));
    return <section key={index} className="text-gray-700">{textWithLineBreaks}</section>;
  };

  return (
    <>
      <p className="text-2xl font-bold text-center flex mb-2 mt-2"> Prompt:  </p>
      <section>{prompt}</section>
      <p className="text-2xl font-bold text-center flex mb-2 mt-2"> AI Response:  </p>

      <div>{parts.map((part, index) => renderPart(part, index))}</div>
    </>
  );
};

export default AiResponse;
