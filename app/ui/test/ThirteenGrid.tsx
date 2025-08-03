export default function DesignGridOverlay() {
    return (
      <div
        className="
          pointer-events-none
          fixed inset-0 top-0 left-0 w-full h-full
          z-50
          flex justify-center
          opacity-10
          select-none
        "
      >
        <div className="w-full max-w-7xl h-full flex">
          {Array.from({ length: 13 }).map((_, i) => (
            <div
              key={i}
              className="
                h-full flex-1 border-l border-r
                border-blue-400
                bg-blue-400/10
                rounded-sm
              "
            />
          ))}
        </div>
      </div>
    );
  }
  
  