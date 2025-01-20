import { useEffect, useRef } from 'react';

interface TextBubbleProps {
  text: string;
  isLoading?: boolean;
  isExiting?: boolean; // New prop to handle exiting animation
  bubbleType?: 'gray' | 'blue';
}

const TextBubble: React.FC<TextBubbleProps> = ({
  text,
  isLoading = false,
  isExiting = false,
  bubbleType = 'gray',
}) => {
  const bubbleRef = useRef<HTMLDivElement>(null);

  // Scroll the bubble into view when it loads
  useEffect(() => {
    if (!isLoading && bubbleRef.current) {
      bubbleRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isLoading]);

  return (
    <div
      ref={bubbleRef}
      className={`transition-transform duration-300 ${
        isExiting ? '-translate-y-[200px] opacity-0' : ''
      } flex items-center my-4 ${
        isLoading ? 'justify-center' : 'justify-start'
      }`}
    >
      {isLoading ? (
        // Loading indicator
        <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse" />
      ) : (
        // Display bubble text
        <div
          className={`${
            bubbleType === 'gray' ? 'bg-gray-200' : 'bg-blue-200'
          } p-4 rounded-lg max-w-md shadow-sm text-left`}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default TextBubble;