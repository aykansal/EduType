export function DecorativeWave() {
    return (
      <div className="relative w-full h-12 overflow-hidden">
        <div className="absolute inset-0 flex items-center">
          <svg
            className="w-full"
            viewBox="0 0 1200 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 20C300 20 300 40 600 30C900 20 900 10 1200 20"
              stroke="url(#wave-gradient)"
              strokeWidth="2"
              fill="none"
            />
            <defs>
              <linearGradient id="wave-gradient" x1="0" y1="0" x2="100%" y2="0">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="50%" stopColor="#818CF8" />
                <stop offset="100%" stopColor="#60A5FA" />
              </linearGradient>
            </defs>
          </svg>
          
          {/* Decorative dots */}
          <div className="absolute inset-0 flex justify-between px-4">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i % 2 === 0 ? "bg-yellow-400" : "bg-blue-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
  