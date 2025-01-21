import { FC } from 'react';

interface TextBubbleProps {
  text: string;
  style?: React.CSSProperties;
}

const TextBubble: FC<TextBubbleProps> = ({ text, style }) => {
  return (
    <div
      className="flex items-center justify-center my-4"
      style={{
        ...style,
        transition: 'transform 0.3s ease, opacity 0.3s ease', // Smooth transitions
      }}
    >
      <div className="bg-blue-200 p-4 rounded-lg max-w-md shadow-sm text-left">
        {text}
      </div>
    </div>
  );
};

export default TextBubble;
