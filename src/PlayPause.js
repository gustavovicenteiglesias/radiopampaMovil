/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import play from './assest/play.png';
import stop from './assest/pause.png';
import ReactLoading from 'react-loading';
import './App.css';

const useAudio = url => {
  const [audio] = useState(new Audio(url));
  const [playing, setPlaying] = useState(false);
  const [loading,setLoadind]=useState(true)
  const toggle = () => setPlaying(!playing);
 
  useEffect(() => {
      playing ? audio.play() : audio.pause();
      audio.volume=1;
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('canplaythrough',()=> setLoadind(false))
    
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing,loading, toggle];
};
const paused=(ancho,alto)=>{
    return <img alt=""  src={stop} width={ancho} height={alto} className="audio"/>

}

const played=(ancho,alto)=>{
    return <img alt=""  src={play} width={ancho} height={alto} className="audio"/>
}
const Player = ({ url,ancho,alto }) => {
  const [playing,loading, toggle] = useAudio(url);
  if (loading) {
   return (<ReactLoading type='spin' width="80px" height="80px" className="audio"/>)
  } else {
    return (
   
      <a 
       onClick={toggle}>{playing ? paused(ancho,alto) : played(ancho,alto)}</a>
    
  );
  }
  
};

export default Player;
