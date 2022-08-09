import React from 'react';
import logo from './logo.svg';
import './App.css';

function Overview() {
  return (
    <div className="h-auto pb-[33vh] selection:bg-[#EDF6F9] selection:text-[#006D77] w-screen bg-[#006D77] text-[#ffffff]">
     <div className='absolute select-none z-0 flex top-[5vh] left-[calc(50vw-17vh)]'>
     <img className='w-[33vh] spin1deg' src="https://media-public.canva.com/ko27I/MAEoE-ko27I/1/s.png"/>
     </div>

     <div className='w-screen flex flex-col z-20 relative'>
     <div className='h-screen w-screen flex flex-col justify-center'>
      <p className='select-all text-[#E9C46A] text-center max-w-[80vw] font-[Cinzel] font-thin self-center text-[5vh] md:text-[7vh] mb-[5vh]'>The  <a className='font-black'>A</a>nimal  <a className='font-black'>U</a>prising  <a className='font-black'>E</a>vent</p>
      </div>



     </div>
    </div>
  );
}

export {
  Overview}


  function LeftOvers(){
    return(
      <div>
     <p className='select-all font-["Cherry_Swash"] max-w-[90vw] self-center text-justify text-[3vh]'>Do not panic, it is inmninent but there are ways to preapare for the <a className='font-[Cinzel] font-thin text-[#E9C46A]'>The  <a className='font-black'>A</a>nimal  <a className='font-black'>U</a>prising  <a className='font-black'>E</a>vent</a></p>
     <p className='select-all mt-[7vh] font-["Cherry_Swash"] md:max-w-[70vw] max-w-[90vw] self-center text-justify text-[3vh]'>AUE (Animal Uprising Event) is the name for imminent upcoming events where animals will try to overcome humans for various reasons, including: destroying their natural habitats, deforestation, environmental pollution and abuse.
</p>
<p className='select-all mt-[7vh] font-["Cherry_Swash"] md:max-w-[70vw] max-w-[90vw] self-center text-justify text-[3vh]'>
Qrab & Nell consultants have linked Christianity, with the only known effective way to survive an Animal Uprising Event.
</p>
<p className='select-all mt-[7vh] font-["Cherry_Swash"] md:max-w-[70vw] max-w-[90vw] self-center text-justify text-[3vh]'>
A random chimp event is an Animal Uprising Event that's mostly asociated with primates.
</p>
<p className='select-all mt-[7vh] font-["Cherry_Swash"] md:max-w-[70vw] max-w-[90vw] self-center text-justify text-[3vh]'>
The onlly known mathematical equation that can predict an Animal Uprising event is:
</p>

<p className='select-all mt-[7vh] font-["Cherry_Swash"] md:max-w-[70vw] max-w-[90vw] self-center text-justify text-[3vh]'>
The sha256 hash of a UTF-8 string containing the current date in the format:
</p>
<p className='bg-[#FCA311] p-[1vh] rounded-[1vh] select-all mt-[3vh] font-["Cherry_Swash"] md:max-w-[70vw] max-w-[90vw] self-center text-justify text-[3vh]'>
[3 letter english day string], [dd] [3 letter english month string]  [yyyy] [hh]:[mm]:[ss]
</p>
<p className='select-all mt-[7vh] font-["Cherry_Swash"] md:max-w-[70vw] max-w-[90vw] self-center text-justify text-[3vh]'>
Plus a UTF-8 string of any current threat asociated with animals, such as 'COVID-19' or 'Monkey Pox'
</p>
      </div>
    )
  }