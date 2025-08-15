export default function Shortcuts( { linksinfo } ) {
  return (
    <div className="flex flex-wrap gap-2">
      {linksinfo.links.map((link, index) => (
        <div key={link.name} className="flex flex-row gap-2">
          <a href={link.url} className="hover:bg-red-800 transition-all duration-100">
            <p className="text-1xl font-bold text-left">{link.name}</p>
          </a>
          {index !== linksinfo.links.length - 1 && <p className="text-1xl font-bold text-left">•</p>}
        </div>
        ))}
    </div>
  );
}