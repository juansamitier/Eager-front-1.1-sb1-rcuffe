import React from 'react';

export default function HowItWorks() {
  return (
    <div className="bg-blue-900/10 backdrop-blur-md rounded-2xl p-8 text-blue-100">
      <h2 className="text-2xl font-semibold mb-12 text-center">How Eager Protocol Works</h2>
      
      <div className="flex items-center justify-between gap-2 px-4">
        {/* sUSDe Holder */}
        <div className="bg-blue-800 rounded-xl p-6 w-96">
          <h3 className="text-xl font-semibold text-blue-100">sUSDe Holder</h3>
          <p className="text-blue-300 mb-6">10% Yield</p>
          
          <p className="text-lg italic text-blue-200 mb-4">
            "I will sacrifice some yield for insurance"
          </p>
          
          <div className="mt-6">
            <p className="text-blue-300">
              Receives esUSDe, an insured version of sUSDe which yields 8% instead of 10%
            </p>
          </div>
        </div>

        {/* Flow Arrows and Labels */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center">
              <div className="h-[2px] w-20 bg-blue-300"></div>
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[12px] border-l-blue-300"></div>
            </div>
            <div className="text-center">
              <p className="text-xs text-blue-300">deposit sUSDe</p>
              <p className="text-xs text-blue-300">with a 10% apr</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center">
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[12px] border-r-blue-300"></div>
              <div className="h-[2px] w-20 bg-blue-300"></div>
            </div>
            <div className="text-center">
              <p className="text-xs text-blue-300">mint esUSDe</p>
              <p className="text-xs text-blue-300">with a 8% apr</p>
            </div>
          </div>
        </div>

        {/* Eager Protocol */}
        <div className="bg-blue-800 rounded-xl p-4 w-48 flex flex-col items-center justify-center">
          <div className="w-24 h-24 flex items-center justify-center">
            <svg viewBox="0 0 100 100" className="w-full h-full text-blue-100" fill="currentColor">
              <path d="M64.74,11.52c-2.62,0-5,2.73-6.94,7.31-2.32-6.75-5.48-10.92-9-10.92C41.72,7.91,36,25.22,36,46.59s5.77,38.68,12.88,38.68c3.49,0,6.65-4.17,9-10.92,1.92,4.57,4.32,7.31,6.94,7.31C71,81.66,76.1,66,76.1,46.59S71,11.52,64.74,11.52ZM54,74.5c-5.13,0-9.3-12.49-9.3-27.91S48.9,18.67,54,18.67a4.39,4.39,0,0,1,3.17,1.68c-2.35,6.43-3.83,15.8-3.83,26.24S54.85,66.4,57.2,72.82A4.39,4.39,0,0,1,54,74.5Zm13.86-8.66c-3.41,0-6.17-8.62-6.17-19.25s2.76-19.25,6.17-19.25S74.05,36,74.05,46.59,71.29,65.84,67.89,65.84Z"/>
              <path d="M24.48,46.59c0-13.21,4.65-24.92,13.73-32.25a.59.59,0,0,0-.55-1C24.23,17.72,14.49,31,14.49,46.59s9.74,28.86,23.17,33.28a.6.6,0,0,0,.55-1C29.13,71.51,24.48,59.79,24.48,46.59Z"/>
            </svg>
          </div>
          <h3 className="text-lg font-semibold mt-2">Eager YDF</h3>
          <p className="text-xs text-blue-300">Yield Distribution Framework</p>
        </div>

        {/* Flow Arrows and Labels */}
        <div className="flex flex-col gap-8">
          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center">
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-r-[12px] border-r-blue-300"></div>
              <div className="h-[2px] w-20 bg-blue-300"></div>
            </div>
            <div className="text-center">
              <p className="text-xs text-blue-300">Secures Ethena</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex items-center">
              <div className="h-[2px] w-20 bg-blue-300"></div>
              <div className="w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[12px] border-l-blue-300"></div>
            </div>
            <div className="text-center">
              <p className="text-xs text-blue-300">Receives</p>
              <p className="text-xs text-blue-300">2% Yield</p>
            </div>
          </div>
        </div>

        {/* Restaker */}
        <div className="bg-blue-800 rounded-xl p-6 w-96">
          <h3 className="text-xl font-semibold text-blue-100">Restaker</h3>
          <p className="text-blue-300 mb-6">Sells insurance and gets extra yield</p>
          
          <p className="text-lg italic text-blue-200">
            "I want to keep my ETH price upside but gain some extra yield"
          </p>
        </div>
      </div>
    </div>
  );
}