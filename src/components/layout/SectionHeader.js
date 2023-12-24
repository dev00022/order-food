export default function SectionHeader({ subHeader, mainHeader }) {
  return (
    <div>
      <h3 className="uppercase font-semibold text-gray-600 leading-4">
        {subHeader}
      </h3>
      <h2 className="text-red-600 font-extrabold text-4xl italic">
        {mainHeader}
      </h2>
    </div>
  );
}
