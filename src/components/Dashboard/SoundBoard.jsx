import React from 'react';
import Knob from '../Knob';

export default function SoundBoard() {
  return (
    <div className="sound-board">
      <div className="knob_border">
        <Knob
          description="Danceability: Crank up this knob to make your tunes more groovy and dance-worthy."
          label="Danceability"
          bgColor={50}
          fieldName="dance"
        />
      </div>
      <div>
        <Knob
          description="Energy: Infuse your music with enthusiasm by increasing this knob for a lively and spirited experience."
          label="Energy"
          bgColor={50}
          fieldName="energy"
        />
      </div>
      <div className="knob_border">
        <Knob
          description="Loudness: Pump up the volume with this knob to create a powerful auditory experience."
          label="Loudness"
          bgColor={50}
          fieldName="loud"
        />
      </div>
      <div className="knob_border">
        <Knob
          description="Vibe: Fine-tune the mood of your music with this knob to create a positive and invigorating atmosphere."
          label="Vibe"
          bgColor={150}
          fieldName="vibe"
        />
      </div>
      <div>
        <Knob
          description="Tempo: Rev up the pace of your tunes by tweaking this knob for a faster, more exhilarating tempo."
          label="Tempo"
          bgColor={150}
          fieldName="tempo"
        />
      </div>
      <div className="knob_border">
        <Knob
          description="Popularity: Dial in to the most beloved and renowned tracks by adjusting this knob."
          label="Popularity"
          bgColor={150}
          fieldName="popular"
        />
      </div>
      <div className="knob_border">
        <Knob
          description="Instrumental: Prefer instrumentals over vocals? Turn this knob up to indulge in melody-rich music."
          label="Instrumental"
          bgColor={300}
          fieldName="instrumental"
        />
      </div>
      <div>
        <Knob
          description="Liveness: Crave the excitement of a live performance? Increase this knob to feel like you're front row at a concert."
          label="Liveness"
          bgColor={300}
          fieldName="live"
        />
      </div>
      <div className="knob_border">
        <Knob
          description="Acousticness: Embrace the charm of traditional instruments by raising this knob to favor acoustic tunes over electronic ones."
          label="Acousticness"
          bgColor={300}
          fieldName="acoustic"
        />
      </div>
    </div>
  );
}
