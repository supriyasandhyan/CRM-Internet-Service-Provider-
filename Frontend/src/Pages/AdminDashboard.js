import React, { useEffect, useRef } from 'react';

const AdminDashboard = () => {
  const iframeContainerRef = useRef(null);

  useEffect(() => {
    const loadYouTubeAPI = () => {
      // Create a script element for the YouTube IFrame API
      const script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      
      // Define the callback function for when the API is ready
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
                controls: 0, // Hide player controls
                playlist: 'q_Z40IrY2rs', // Looping the video requires adding the video ID to the playlist
                modestbranding: 1, // Hide YouTube logo
                rel: 0, // Disable related videos at the end
                mute: 1 // Ensure video is muted to allow autoplay
              },
              events: {
                onReady: (event) => {
                  event.target.playVideo(); // Start video on ready
                },
                onStateChange: (event) => {
                  if (event.data === window.YT.PlayerState.ENDED) {
                    event.target.playVideo(); // Restart video when it ends
                  }
                }
              }
            });
          }
        };
      };

      // Append the script to the document body
      document.body.appendChild(script);

      // Cleanup function to remove the script
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
      <h1>Dashboard</h1>
      <div
        ref={iframeContainerRef}
        id="youtube-player"
        style={{ width: '1000px', height: '470px' }}
      ></div>
    </div>
  );
};

export default AdminDashboard;
