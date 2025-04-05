
import React from 'react';

const Reports = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white/20 to-gray-100/20 backdrop-blur-sm relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#303307] to-[#45491a] opacity-80 -z-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48cmVjdCBmaWxsPSIjNDU0OTFhIiB3aWR0aD0iMTQ0MCIgaGVpZ2h0PSI3NjAiLz48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjRkZGIiBjeD0iMzMwIiBjeT0iNDU1IiByPSIyNDAiLz48Y2lyY2xlIGZpbGwtb3BhY2l0eT0iLjA1IiBmaWxsPSIjRkZGIiBjeD0iMTExOCIgY3k9IjI5MSIgcj0iMTcwIi8+PC9nPjwvc3ZnPg==')] bg-cover opacity-10 mix-blend-overlay animate-pulse"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-olive/20 animate-float"
            style={{
              width: `${Math.random() * 25 + 5}px`,
              height: `${Math.random() * 25 + 5}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              opacity: Math.random() * 0.6 + 0.2,
              filter: `blur(${Math.random() * 2}px)`,
            }}
          ></div>
        ))}
      </div>
      
      <div className="flex-1 p-8 z-10 text-white">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-white/70">View detailed reports and analytics of your business.</p>
        </div>
        
        <div className="border border-white/20 rounded-lg p-8 text-center animate-fade-in bg-white/10 backdrop-blur-sm" style={{animationDelay: "0.2s"}}>
          <h2 className="text-xl font-semibold text-white/90">Reports & Analytics Content</h2>
          <p className="text-white/70">This page is under development.</p>
        </div>
      </div>
    </div>
  );
};

export default Reports;
