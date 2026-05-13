const Logo = () => {
  return (
    <div className="flex items-center gap-2 cursor-pointer">
      
      {/* Icon */}
      <div className="p-2 rounded-lg bg-linear-to-r from-cyan-400 to-cyan-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          {/* keyboard outline */}
          <rect x="2" y="6" width="20" height="12" rx="2" stroke="white"/>
          
          {/* keys */}
          <circle cx="6" cy="10" r="0.8" fill="white"/>
          <circle cx="10" cy="10" r="0.8" fill="white"/>
          <circle cx="14" cy="10" r="0.8" fill="white"/>
          <circle cx="18" cy="10" r="0.8" fill="white"/>
          
          <rect x="6" y="14" width="12" height="1.5" rx="0.5" fill="white"/>
        </svg>
      </div>

      {/* Text */}
      <h1 className="text-lg md:text-xl font-bold 
        bg-linear-to-r from-cyan-400 to-cyan-600 
        bg-clip-text text-transparent">
        TypeMaster
      </h1>
    </div>
  );
};

export default Logo;