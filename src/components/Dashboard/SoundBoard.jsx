import React, { useState } from 'react';
import Knob from '../Knob';
import { Button } from '@mantine/core';
import CustomSlider from '../Slider/CustomSlider';
import { useDispatch, useSelector } from 'react-redux';
import { toggleState } from '../../store/reducers/toggleSlice';
import { setFieldValue } from '../../store/reducers/soundBoardSlice';
export default function SoundBoard() {
  const toggleStates = useSelector((state) => state.toggleSlice);
  const [isSlider, setIsSlider] = useState(false);
  const dispatch = useDispatch();
  const handleToggleChange = () => {
    setIsSlider(!isSlider);
  };
  const handleToggleState = (field, fieldValue) => {
    dispatch(toggleState({ field }));
    dispatch(setFieldValue({ field: fieldValue, value: '' }));
  };

  return (
    <>
      <Button
        className="board_button"
        variant="gradient"
        gradient={{ from: 'teal', to: 'lime', deg: 105 }}
        onClick={handleToggleChange}
      >
        {isSlider ? 'Switch to Knobs' : 'Switch to Sliders'}
      </Button>
      <div className="sound-board">
        <div className="knob_border">
          {isSlider ? (
            <CustomSlider
              description="Danceability: Crank up this slider to make your tunes more groovy and dance-worthy."
              label="Danceability"
              bgColor={50}
              fieldName="dance"
              locked={toggleStates.danceEnabled}
            />
          ) : (
            <Knob
              description="Danceability: Crank up this knob to make your tunes more groovy and dance-worthy."
              label="Danceability"
              bgColor={50}
              fieldName="dance"
              locked={toggleStates.danceEnabled}
            />
          )}
          <div className="toggle__wrapper">
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="danceToggle"
                name="danceToggle"
                checked={toggleStates.danceEnabled}
                onChange={() => handleToggleState('danceEnabled', 'dance')}
              />
              <div className="back">
                <label
                  className="but"
                  htmlFor="danceToggle"
                >
                  <span className="on">I</span>
                  <span className="off">0</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="knob_border--center">
          {isSlider ? (
            <CustomSlider
              description="Energy: Infuse your music with enthusiasm by increasing this slider for a lively and spirited experience."
              label="Energy"
              bgColor={50}
              fieldName="energy"
              locked={toggleStates.energyEnabled}
            />
          ) : (
            <Knob
              description="Energy: Infuse your music with enthusiasm by increasing this knob for a lively and spirited experience."
              label="Energy"
              bgColor={50}
              fieldName="energy"
              locked={toggleStates.energyEnabled}
            />
          )}
          <div className="toggle__wrapper">
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="energyToggle"
                name="energyToggle"
                checked={toggleStates.energyEnabled}
                onChange={() => handleToggleState('energyEnabled', 'energy')}
              />
              <div className="back">
                <label
                  className="but"
                  htmlFor="energyToggle"
                >
                  <span className="on">I</span>
                  <span className="off">0</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="knob_border">
          {isSlider ? (
            <CustomSlider
              description="Loudness: Pump up the volume with this slider to create a powerful auditory experience."
              label="Loudness"
              bgColor={50}
              fieldName="loud"
              locked={toggleStates.loudnessEnabled}
            />
          ) : (
            <Knob
              description="Loudness: Pump up the volume with this knob to create a powerful auditory experience."
              label="Loudness"
              bgColor={50}
              fieldName="loud"
              locked={toggleStates.loudnessEnabled}
            />
          )}
          <div className="toggle__wrapper">
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="loudnessToggle"
                name="loudnessToggle"
                checked={toggleStates.loudnessEnabled}
                onChange={() => handleToggleState('loudnessEnabled', 'loud')}
              />
              <div className="back">
                <label
                  className="but"
                  htmlFor="loudnessToggle"
                >
                  <span className="on">I</span>
                  <span className="off">0</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="knob_border">
          {isSlider ? (
            <CustomSlider
              description="Vibe: Fine-tune the mood of your music with this slider to create a positive and invigorating atmosphere."
              label="Vibe"
              bgColor={150}
              fieldName="vibe"
              locked={toggleStates.vibeEnabled}
            />
          ) : (
            <Knob
              description="Vibe: Fine-tune the mood of your music with this knob to create a positive and invigorating atmosphere."
              label="Vibe"
              bgColor={150}
              fieldName="vibe"
              locked={toggleStates.vibeEnabled}
            />
          )}
          <div className="toggle__wrapper">
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="vibeToggle"
                name="vibeToggle"
                checked={toggleStates.vibeEnabled}
                onChange={() => handleToggleState('vibeEnabled', 'vibe')}
              />
              <div className="back">
                <label
                  className="but"
                  htmlFor="vibeToggle"
                >
                  <span className="on">I</span>
                  <span className="off">0</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="knob_border--center">
          {isSlider ? (
            <CustomSlider
              description="Tempo: Rev up the pace of your tunes by tweaking this slider for a faster, more exhilarating tempo."
              label="Tempo"
              bgColor={150}
              fieldName="tempo"
              locked={toggleStates.tempoEnabled}
            />
          ) : (
            <Knob
              description="Tempo: Rev up the pace of your tunes by tweaking this knob for a faster, more exhilarating tempo."
              label="Tempo"
              bgColor={150}
              fieldName="tempo"
              locked={toggleStates.tempoEnabled}
            />
          )}
          <div className="toggle__wrapper">
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="tempoToggle"
                name="tempoToggle"
                checked={toggleStates.tempoEnabled}
                onChange={() => handleToggleState('tempoEnabled', 'tempo')}
              />
              <div className="back">
                <label
                  className="but"
                  htmlFor="tempoToggle"
                >
                  <span className="on">I</span>
                  <span className="off">0</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="knob_border">
          {isSlider ? (
            <CustomSlider
              description="Popularity: Dial in to the most beloved and renowned tracks by adjusting this slider."
              label="Popularity"
              bgColor={150}
              fieldName="popular"
              locked={toggleStates.popularityEnabled}
            />
          ) : (
            <Knob
              description="Popularity: Dial in to the most beloved and renowned tracks by adjusting this knob."
              label="Popularity"
              bgColor={150}
              fieldName="popular"
              locked={toggleStates.popularityEnabled}
            />
          )}
          <div className="toggle__wrapper">
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="popularityToggle"
                name="popularityToggle"
                checked={toggleStates.popularityEnabled}
                onChange={() =>
                  handleToggleState('popularityEnabled', 'popular')
                }
              />
              <div className="back">
                <label
                  className="but"
                  htmlFor="popularityToggle"
                >
                  <span className="on">I</span>
                  <span className="off">0</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="knob_border">
          {isSlider ? (
            <CustomSlider
              description="Instrumental: Prefer instrumentals over vocals? Turn this slider up to indulge in melody-rich music."
              label="Instrumental"
              bgColor={300}
              fieldName="instrumental"
              locked={toggleStates.instrumentalEnabled}
            />
          ) : (
            <Knob
              description="Instrumental: Prefer instrumentals over vocals? Turn this knob up to indulge in melody-rich music."
              label="Instrumental"
              bgColor={300}
              fieldName="instrumental"
              locked={toggleStates.instrumentalEnabled}
            />
          )}
          <div className="toggle__wrapper">
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="instrumentalToggle"
                name="instrumentalToggle"
                checked={toggleStates.instrumentalEnabled}
                onChange={() =>
                  handleToggleState('instrumentalEnabled', 'instrumental')
                }
              />
              <div className="back">
                <label
                  className="but"
                  htmlFor="instrumentalToggle"
                >
                  <span className="on">I</span>
                  <span className="off">0</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="knob_border--center">
          {isSlider ? (
            <CustomSlider
              description="Liveness: Crave the excitement of a live performance? Increase this slider to feel like you're front row at a concert."
              label="Liveness"
              bgColor={300}
              fieldName="live"
              locked={toggleStates.livenessEnabled}
            />
          ) : (
            <Knob
              description="Liveness: Crave the excitement of a live performance? Increase this knob to feel like you're front row at a concert."
              label="Liveness"
              bgColor={300}
              fieldName="live"
              locked={toggleStates.livenessEnabled}
            />
          )}
          <div className="toggle__wrapper">
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="livenessToggle"
                name="livenessToggle"
                checked={toggleStates.livenessEnabled}
                onChange={() => handleToggleState('livenessEnabled', 'live')}
              />
              <div className="back">
                <label
                  className="but"
                  htmlFor="livenessToggle"
                >
                  <span className="on">I</span>
                  <span className="off">0</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="knob_border">
          {isSlider ? (
            <CustomSlider
              description="Acousticness: Embrace the charm of traditional instruments by raising this slider to favor acoustic tunes over electronic ones."
              label="Acousticness"
              bgColor={300}
              fieldName="acoustic"
              locked={toggleStates.acousticnessEnabled}
            />
          ) : (
            <Knob
              description="Acousticness: Embrace the charm of traditional instruments by raising this knob to favor acoustic tunes over electronic ones."
              label="Acousticness"
              bgColor={300}
              fieldName="acoustic"
              locked={toggleStates.acousticnessEnabled}
            />
          )}
          <div className="toggle__wrapper">
            <div className="toggle-switch">
              <input
                type="checkbox"
                id="acousticnessToggle"
                name="acousticnessToggle"
                checked={toggleStates.acousticnessEnabled}
                onChange={() =>
                  handleToggleState('acousticnessEnabled', 'acoustic')
                }
              />
              <div className="back">
                <label
                  className="but"
                  htmlFor="acousticnessToggle"
                >
                  <span className="on">I</span>
                  <span className="off">0</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
