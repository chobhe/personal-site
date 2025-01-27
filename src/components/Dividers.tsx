import Link from "next/link";

interface Divider {
  name: string;
  path: string;
}

interface DividersProps {
  sections: Divider[];
}

const Dividers: React.FC<DividersProps> = ({ sections }) => {
  return (
    <div className="absolute right-[-4rem] top-1/4 h-[75%] flex flex-col gap-4">
      {sections.map((section, index) => (
        <Link
          key={index}
          href={section.path}
          className="bg-yellow-300 text-black font-bold border border-black p-2 rounded-r-md shadow-md hover:scale-105 transition-transform cursor-pointer"
          style={{
            transform: `translateY(${index * 2}rem)`,
          }}
        >
          {section.name}
        </Link>
      ))}
    </div>
  );
};

export default Dividers;