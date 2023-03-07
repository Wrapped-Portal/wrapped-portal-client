/** @format */

import React from 'react';
import Button from './Button';
import {
  Group,
  Image,
  Stack
} from '@mantine/core';

export default function Splash() {
  return (
    <main className="splash">
      <Group className='splash__title' >
        <h1>Wrapped Portal</h1>
        <svg
          className="sidebar-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="130"
          height="130"
          viewBox="0 0 24 24"
        >
          <path
            fill="white"
            d="M10.421 11.375c-.294 1.028.012 2.064.784 2.653c1.061.81 2.565.3 2.874-.995c.08-.337.103-.722.027-1.056c-.23-1.001-.52-1.988-.792-2.996c-1.33.154-2.543 1.172-2.893 2.394zm5.548-.287c.273 1.012.285 2.017-.127 3c-1.128 2.69-4.721 3.14-6.573.826c-1.302-1.627-1.28-3.961.06-5.734c.78-1.032 1.804-1.707 3.048-2.054l.379-.104c-.084-.415-.188-.816-.243-1.224c-.176-1.317.512-2.503 1.744-3.04c1.226-.535 2.708-.216 3.53.76c.406.479.395 1.08-.025 1.464c-.412.377-.996.346-1.435-.09c-.247-.246-.51-.44-.877-.436c-.525.006-.987.418-.945.937c.037.468.173.93.3 1.386c.022.078.216.135.338.153c1.334.197 2.504.731 3.472 1.676c2.558 2.493 2.861 6.531.672 9.44c-1.529 2.032-3.61 3.168-6.127 3.409c-4.621.44-8.664-2.53-9.7-7.058c-.945-4.144 1.38-8.568 5.335-10.149c.586-.234 1.143-.031 1.371.498c.232.537-.019 1.086-.61 1.35c-2.368 1.06-3.817 2.855-4.215 5.424c-.533 3.433 1.656 6.776 5 7.72c2.723.77 5.658-.166 7.308-2.33c1.586-2.08 1.4-5.099-.427-6.873a3.979 3.979 0 0 0-1.823-1.013c.198.716.389 1.388.57 2.062z"
          />
        </svg>
      </Group>
      <Stack className='splash__header__text'>
        <h3 className='splash__textBold'>Your Custom Spotify Experience</h3>
        <p className='splash__text__header'>Login with Spotify to access your listening stats, get personalized recommendations, and create custom playlists with ease.</p>
        <Button />
      </Stack>
      <div className='splash__image'>
      <Image
        src='../../../studio2.jpeg'
        radius="md"
        width={1600}
        height={400}
      />
      </div>
      <div className='splash__description__contain'>
        <div className='splash__description__item'>
          <Group>
            <div className='splash__svg__container'>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round" >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2"></path>
                <path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z"></path>
                <path d="M9 17v-5"></path>
                <path d="M12 17v-1"></path>
                <path d="M15 17v-3"></path>
              </svg>
            </div>
            <h3 >Discover Your Listening Habits</h3>
          </Group>
          <p className='splash__text'>Explore your music habits like never before! See your top tracks and artists in the last month, last 6 months, and all-time. Discover new tracks that align with your taste.</p>
        </div>
        <div className='splash__description__item'>
          <Group>
            <div className='splash__svg__container'>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M14 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
                <path d="M17 17v-13h4"></path>
                <path d="M13 5h-10"></path>
                <path d="M3 9l10 0"></path>
                <path d="M9 13h-6"></path>
              </svg>
            </div>
            <h3>Create Custom Playlists</h3>
          </Group>
          <p className='splash__text'>Save time creating custom playlists on Spotify with our website! Add any song from our page to your existing playlists or create new ones effortlessly.</p>
        </div>
        <div className='splash__description__item'>
          <Group>
            <div className='splash__svg__container'>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3"></path>
              </svg>
            </div>
            <h3>Get Custom Recommendations</h3>
          </Group>
          <p className='splash__text'>Get customized recommendations! Tweak unique Spotify parameters to generate recommendations that fit your mood and preferences.</p>
        </div>
        <div className='splash__description__item'>
          <Group>
            <div className='splash__svg__container'>
              <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" strokeWidth="2" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M16 4l4 0l0 4"></path>
                <path d="M14 10l6 -6"></path>
                <path d="M8 20l-4 0l0 -4"></path>
                <path d="M4 20l6 -6"></path>
                <path d="M16 20l4 0l0 -4"></path>
                <path d="M14 14l6 6"></path>
                <path d="M8 4l-4 0l0 4"></path>
                <path d="M4 4l6 6"></path>
              </svg>
            </div>
            <h3>Maximize Your Spotify Experience</h3>
          </Group>
          <p className='splash__text'>Maximize your Spotify experience with Wrapped Portal! Get customized recommendations, access your listening habits, and create playlists easily to take your musical journey to the next level.</p>
        </div>
      </div>
    </main>
  );
}
