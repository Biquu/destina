"use client";

import '@livekit/components-styles';
import {
  LiveKitRoom,
  ControlBar,
  RoomAudioRenderer,
  Chat,
  AudioConference,
  VideoConference,
} from '@livekit/components-react';
import { useEffect, useState } from 'react';

export default function Page() {
  // TODO: get user input for room and name
  const room = "destina";
  const name = "Bilal";
  const [token, setToken] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const resp = await fetch(
          `/api/get-participant-token?room=${room}&username=${name}`
        );
        const data = await resp.json();
        setToken(data.token);
      } catch (e) {
        console.error(e);
      }
    })();
  }, []);

  if (token === "") {
    return <div>Getting token...</div>;
  }

  return (
    <LiveKitRoom
      video={true}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: '100dvh' }}
    >
      
      <VideoConference />
    </LiveKitRoom>
  );
}
