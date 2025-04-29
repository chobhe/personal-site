import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image'; // or your image component

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const handwritingFont = {
  fontFamily: '"Indie Flower", cursive',
  fontSize: '1.2rem',
  color: '#222',
  background: 'transparent',
  whiteSpace: 'pre-wrap',
  overflow: 'auto',
  padding: '2rem',
  lineHeight: 1.7,
};

type NotebookPageProps = {
  frontMd: string;
  backMd: string;
};

export const NotebookPage: React.FC<NotebookPageProps> = ({ frontMd, backMd }) => {
  const [showFront, setShowFront] = useState(true);

  return (
    <div style={{ position: 'relative', width: '600px', height: '800px' }}>
      <Image
        src={`${basePath}/images/notebook-open.png`}
        alt="Notebook Page"
        fill
        style={{ objectFit: 'contain', objectPosition: 'center' }}
      />
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '10%',
          width: '80%',
          height: '80%',
          ...handwritingFont,
        }}
      >
        <ReactMarkdown>
          {showFront ? frontMd : backMd}
        </ReactMarkdown>
      </div>
      <button
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: 2,
        }}
        onClick={() => setShowFront((f) => !f)}
      >
        {showFront ? 'Show Back' : 'Show Front'}
      </button>
    </div>
  );
};
