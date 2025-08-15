export default function Shortcuts( { linksinfo, classname } ) {
  return (
    <div className="flex flex-wrap gap-2">
      {linksinfo.links.map((link, index) => (
        <div key={link.name} className="flex flex-row gap-2">
          <a href={link.url} className="hover:bg-red-800 hover:text-white transition-all duration-100">
            <p className={`${classname} font-bold text-left`}>{link.name}</p>
          </a>
          {index !== linksinfo.links.length - 1 && <p className={`${classname} font-bold text-left`}>•</p>}
        </div>
        ))}
    </div>
  );
}