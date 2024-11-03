import React from 'react';
import { BookOpen } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface HeaderProps {
  setActiveTab: (tab: string) => void;
}

export default function Header({ setActiveTab }: HeaderProps) {
  return (
    <header className="bg-blue-900/20 backdrop-blur-sm border-b border-blue-400/10">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-3 items-center">
          {/* Logo */}
          <div className="flex flex-col items-start">
            <svg 
              viewBox="0 0 291.95 93.18" 
              className="h-12 text-blue-100"
              fill="currentColor"
            >
              <ellipse cx="83.93" cy="46.59" rx="3.65" ry="10.54"/>
              <path d="M64.74,11.52c-2.62,0-5,2.73-6.94,7.31-2.32-6.75-5.48-10.92-9-10.92C41.72,7.91,36,25.22,36,46.59s5.77,38.68,12.88,38.68c3.49,0,6.65-4.17,9-10.92,1.92,4.57,4.32,7.31,6.94,7.31C71,81.66,76.1,66,76.1,46.59S71,11.52,64.74,11.52ZM54,74.5c-5.13,0-9.3-12.49-9.3-27.91S48.9,18.67,54,18.67a4.39,4.39,0,0,1,3.17,1.68c-2.35,6.43-3.83,15.8-3.83,26.24S54.85,66.4,57.2,72.82A4.39,4.39,0,0,1,54,74.5Zm13.86-8.66c-3.41,0-6.17-8.62-6.17-19.25s2.76-19.25,6.17-19.25S74.05,36,74.05,46.59,71.29,65.84,67.89,65.84Z"/>
              <path d="M24.48,46.59c0-13.21,4.65-24.92,13.73-32.25a.59.59,0,0,0-.55-1C24.23,17.72,14.49,31,14.49,46.59s9.74,28.86,23.17,33.28a.6.6,0,0,0,.55-1C29.13,71.51,24.48,59.79,24.48,46.59Z"/>
              <g>
                <path d="M102.35,17.79H137.8v6h-29V38.61h26.81v5.65H108.8V60.82h29.5v5.82h-36Z"/>
                <path d="M165.43,45.09a3.25,3.25,0,0,0,2.76-1.73,5.22,5.22,0,0,0,.4-2.3,4.88,4.88,0,0,0-2.17-4.46,11.63,11.63,0,0,0-6.22-1.38q-4.68,0-6.64,2.53a8.4,8.4,0,0,0-1.43,4.18h-5.58q.16-6.6,4.26-9.18a17.44,17.44,0,0,1,9.52-2.59,19.35,19.35,0,0,1,10.2,2.4A8.1,8.1,0,0,1,174.41,40V60.52a2.69,2.69,0,0,0,.38,1.5,1.89,1.89,0,0,0,1.62.56,7.6,7.6,0,0,0,.9,0c.33,0,.68-.08,1.06-.15v4.43a16.12,16.12,0,0,1-2.13.49,14.89,14.89,0,0,1-2,.1,4.92,4.92,0,0,1-4.49-2.19,8.45,8.45,0,0,1-1-3.29,15.2,15.2,0,0,1-5.26,4.15,16.19,16.19,0,0,1-7.55,1.77,11.23,11.23,0,0,1-8.09-3,10,10,0,0,1-3.15-7.52,9.68,9.68,0,0,1,3.1-7.67,14.67,14.67,0,0,1,8.11-3.36Z"/>
                <path d="M204,32.46a16,16,0,0,1,3.45,3.39V31.36H213V63.75q0,6.78-2,10.7-3.72,7.26-14,7.25a17.25,17.25,0,0,1-9.65-2.57q-3.9-2.58-4.37-8.07H189a6.78,6.78,0,0,0,1.72,3.69q2,2,6.35,2c4.57,0,7.55-1.62,9-4.86.83-1.9,1.22-5.31,1.15-10.21a11.61,11.61,0,0,1-4.3,4.06A15.42,15.42,0,0,1,186.18,63q-4.32-4.11-4.32-13.59,0-8.94,4.36-14a13.46,13.46,0,0,1,10.51-5A12.83,12.83,0,0,1,204,32.46Z"/>
                <path d="M244.1,32a13.47,13.47,0,0,1,5.38,4.6,15.86,15.86,0,0,1,2.38,6.29,40.63,40.63,0,0,1,.53,7.84h-25.9A15.38,15.38,0,0,0,229,59.46q2.37,3.28,7.36,3.29a9.46,9.46,0,0,0,7.42-3.11,10.6,10.6,0,0,0,2.2-4.17h5.88a12.44,12.44,0,0,1-1.54,4.37,16,16,0,0,1-2.93,3.94,13.87,13.87,0,0,1-6.7,3.59,20,20,0,0,1-4.85.53,14.87,14.87,0,0,1-11.21-4.84q-4.59-4.83-4.59-13.55t4.63-13.93a15.2,15.2,0,0,1,12.09-5.35A16.05,16.05,0,0,1,244.1,32Z"/>
                <path d="M260.14,31h5.69v6.15a13.45,13.45,0,0,1,3.42-4.38,8.91,8.91,0,0,1,6.29-2.57l.56,0,1.36.13v6.32a7.57,7.57,0,0,0-1-.13c-.3,0-.62,0-1,0a8.55,8.55,0,0,0-6.95,2.91,10.13,10.13,0,0,0-2.43,6.7V66.64h-6Z"/>
              </g>
            </svg>
            <p className="text-blue-200 text-xs italic mt-1">Self repaying insurance</p>
          </div>

          {/* Center Text */}
          <div className="flex flex-col items-center">
            <p className="text-xl italic text-center bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent font-medium mb-4">
              Get a safer version of any asset
            </p>
            <button
              onClick={() => setActiveTab('how-it-works')}
              className="text-sm italic text-blue-300 hover:text-blue-100 transition-colors"
            >
              See how it works →
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-4">
            <a
              href="https://eager-protocol.gitbook.io/eager"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-blue-800/50 hover:bg-blue-800/70 text-blue-100 rounded-lg font-medium transition-colors"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Docs
            </a>
            <ConnectButton />
          </div>
        </div>
      </div>
    </header>
  );
}