import { FC } from 'react';

// interface TextBubbleProps {
//   text: string;
//   heightRatio: number;
//   widthRatio: number;
//   style?: React.CSSProperties;
// }

// const TextBubble: FC<TextBubbleProps> = ({ text, heightRatio, widthRatio, style }) => {
//   return (
//     <div
//       className="flex items-center justify-center my-4"
//       style={{
//         ...style,
//         transition: 'transform 0.3s ease, opacity 0.3s ease', // Smooth transitions
//       }}
//     >
//       <div className="bg-blue-200 p-4 rounded-lg max-w-md shadow-sm text-left" style={{
//         minHeight: `${heightRatio * 100}vh`, // Multiply ratio by 10 for better viewport scaling
//         width: `${widthRatio * 100}vw`,      // Multiply ratio by 10 for better viewport scaling
//       }}>
//         {text}
//       </div>
//     </div>
//   );
// };

// export default TextBubble;


interface TextBubbleProps {
  text: string;
  style?: React.CSSProperties; // For dynamic styles passed down
  heightRatio?: number; // Height as a percentage of viewport height
  widthRatio?: number; // Width as a percentage of viewport width
}

const TextBubble: React.FC<TextBubbleProps> = ({ text, style, heightRatio = 0.1, widthRatio = 0.25 }) => {
  // Default styling
  const bubbleStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    borderRadius: '24px',
    padding: '16px 24px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    position: 'absolute',
    width: `calc(${widthRatio * 100}%)`,
    height: `calc(${heightRatio * 100}%)`,
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1rem',
    fontWeight: 500,
    color: '#333',
    ...style, // Allow dynamic styles to override
  };

  return <div style={bubbleStyle}>{text}</div>;
};

export default TextBubble;
