import React, { useEffect, useRef } from 'react';

const AdminDashboard = () => {
  const iframeContainerRef = useRef(null);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      
      script.onload = () => {
        window.onYouTubeIframeAPIReady = () => {
          if (iframeContainerRef.current) {
            new window.YT.Player(iframeContainerRef.current, {
              height: '315',
              width: '560',
              videoId: 'q_Z40IrY2rs',
              playerVars: {
                autoplay: 1,
                loop: 1,
                controls: 0, 
                playlist: 'q_Z40IrY2rs', 
                modestbranding: 1,
                rel: 0, 
                mute: 1
              },
              events: {
                onReady: (event) => {
                  event.target.playVideo(); 
                },
                onStateChange: (event) => {
                  if (event.data === window.YT.PlayerState.ENDED) {
                    event.target.playVideo();
                  }
                }
              }
            });
          }
        };
      };

      document.body.appendChild(script);
      return () => {
        const existingScript = document.querySelector('script[src="https://www.youtube.com/iframe_api"]');
        if (existingScript) {
          document.body.removeChild(existingScript);
        }
      };
    };

    loadYouTubeAPI();

  }, []);

  return (
    <div>
      <h3>CRM Dashboard</h3>
      <div
        ref={iframeContainerRef}
        id="youtube-player"
        style={{ width: '1000px', height: '470px' }}
      ></div>
    </div>
  );
};

export default AdminDashboard;
