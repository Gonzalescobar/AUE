import React from 'react';
import logo from './logo.svg';
import './App.css';
import pdf1 from './04_Survival_Tips.pdf'
import pdf2 from './field_guide_wildlife_diseases.pdf'
import pdf3 from './WJ-Friday-15th-January_-Survival-Guide.pdf'
import {useNavigate} from 'react-router-dom'

const collision = " Monkey Pox & COVID 19"

class RareFishesClass extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: [], polystring: null, TFpercentage: '?' }
  }

  componentDidMount() {
    this.dataTemp()
    this.hashInterval = setInterval(() => { this.dataTemp() }, 1000)
    this.get24Percentage()
  }
  componentWillUnmount() {
    clearInterval(this.hashInterval)
  }

  timeChange = 0

  data1 = [
    { Name: 'Salmon', MarketPricePerKilo: 7.84 },
    { Name: 'Blue Tang', MarketPricePerKilo: 587.39 },
    { Name: 'Tilapia', MarketPricePerKilo: 5.23 },
    { Name: 'Queen Angelfish', MarketPricePerKilo: 492.21 }
  ]


  async returnHashNumberWeighted(ProbabilityString) {
    let utf8Encode = new TextEncoder();
    let hashArray = Array.from(new Uint8Array(await crypto.subtle.digest("sha-256", utf8Encode.encode(ProbabilityString))));                     // convert buffer to byte array
    let hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    let factor = (1 + ((100 / 12) ** (2)) * parseInt(hashHex, 16) / 16 ** 64) ** 2
    return ((100 / 12) + (100 - (100 / 12)) / factor).toFixed(5)
  }

  async returnHashNumberWeightedDaily(ProbabilityString) {
    let utf8Encode = new TextEncoder();
    let hashArray = Array.from(new Uint8Array(await crypto.subtle.digest("sha-256", utf8Encode.encode(ProbabilityString))));                     // convert buffer to byte array
    let hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    let factor = (1 + ((100 / 12) ** (2)) * parseInt(hashHex, 16) / 16 ** 64) ** 1
    return ((100 / 12) + (100 - (100 / 12)) / factor).toFixed(5)
  }

  async dataTemp() {
    let tempArray = []

    if (this.state.data.length < 900) {
      for (let nm = 900; nm > 0; nm = nm - 1) {
        let ProbabilityString = new Date(Math.floor(Math.floor(Date.now() + this.timeChange - 1000 * nm) / 1000) * 1000).toUTCString().replace(" GMT", "")
        tempArray.push({ "Probability": await this.returnHashNumberWeighted(ProbabilityString + collision), "Time": ProbabilityString })
      }



    } else {
      tempArray = this.state.data; tempArray.shift()
      let ProbabilityString = new Date(Math.floor(Math.floor(Date.now()) / 1000) * 1000).toUTCString().replace(" GMT", "")
      tempArray.push({ "Probability": await this.returnHashNumberWeighted(ProbabilityString + collision), "Time": ProbabilityString })
    }
    this.getPolyString()
    this.get24Percentage()
    this.setState({ data: tempArray })
  }


  getPercentage() {
    try {
      return this.state.data[this.state.data.length - 1]["Probability"]
    } catch {
      return '?'
    }
  }

  async get24Percentage() {
    let ProbabilityString = new Date(Math.floor(Math.floor(Date.now() + this.timeChange) / 10000) * 10000).toUTCString().replace(" GMT", "")
    ProbabilityString = ProbabilityString.replace(" " + ProbabilityString.split(" ")[4], "")
    let tempInt = parseFloat(await this.returnHashNumberWeightedDaily(ProbabilityString + collision))
    this.setState({ TFpercentage: tempInt })
  }

  getPolyString() {
    var polyString = ""
    for (let nm = 0; nm < this.state.data.length; nm++) {
      polyString = polyString + (nm).toString() + " " + ((100 - this.state.data[nm]["Probability"]) * 3).toString() + " "
    }
    this.setState({ polystring: polyString })
  }

  setImmediate() {

  }

  getTimeArray(pos) {
    try {
      return this.state.data[this.state.data.length - 1]["Time"].split(" ")[pos]
    } catch {
      return "     "
    }
  }

  render() {
    return (

      <div className='self-center w-screen h-auto flex flex-col cursor-default justify-center sm:m-0'>
        <p className='mb-[5vh] m-[1vh] text-center text-[2.5vh] sm:text-[3.7vh] font-extralight self-center'><a className='font-normal'>Animal uprising event </a>probability (Globally)</p>
        <svg viewBox="0 0 900 300" className='h-[50vh] rounded-[1vh] max-h-[30vw] self-center bg-[#00000000]' xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline className='stroke-[0.17%]' fill="#E9C46A" stroke="#E9C46A" points={this.state.polystring} />
        </svg>
        <p className='sm:text-[3vh] text-[#ffffff] mt-[3vh]   text-[2.1vh] text-center self-center'>{"Current Risk: " + this.getPercentage() + "%"}</p>
        <p className='sm:text-[3vh] text-[#ffffff] font-bold mt-[1vh] text-[2.1vh] text-center self-center'>{"Acumulated Risk during the last 24 hours: " + this.state.TFpercentage + "%"}</p>
        <p className='sm:text-[3vh] text-[#ffffff] font-light mt-[1vh] flex flex-row text-[2.1vh] text-center self-center'><p className='font-bold mr-[1vh]'>Current Threats: </p>{" " + collision}</p>
        <div className='flex cursor-default mt-[1vh] flex-row justify-center'>
          <p className='sm:text-[3vh] text-[#ffffff] text-[2.1vh] m-[1vh] text-center self-center'>{this.getTimeArray(1)}</p>
          <p className='sm:text-[3vh] text-[#ffffff] text-[2.1vh] m-[1vh] text-center self-center'>{this.getTimeArray(2)}</p>
          <p className='sm:text-[3vh] text-[#ffffff] text-[2.1vh] m-[1vh] text-center self-center'>{this.getTimeArray(3)}</p>
          <p className='sm:text-[3vh] text-[#ffffff] text-[2.1vh] m-[1vh] text-center self-center'>{this.getTimeArray(4)}</p>
          <p className='sm:text-[3vh] text-[#ffffff] text-[2.1vh] m-[1vh] text-center self-center'>{"GMT"}</p>
        </div>
        <p className='m-[3vh]  sm:text-[2.7vh] text-[#ffffff] text-[1.9vh] text-center self-center'>{"The standard risk of a random chimp event happening is 1/12 every 24 hours"}</p>
      </div>
    )
  }
}

async function returnHashNumberWeighted(ProbabilityString) {
  let utf8Encode = new TextEncoder();
  let hashArray = Array.from(new Uint8Array(await crypto.subtle.digest("sha-256", utf8Encode.encode(ProbabilityString))));                     // convert buffer to byte array
  let hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  let factor = (1 + ((100 / 12) ** (2)) * parseInt(hashHex, 16) / 16 ** 64) ** 2
  return ((100 / 12) + (100 - (100 / 12)) / factor).toFixed(5)
}



function App() {

  const navigatee = useNavigate();

React.useEffect(() => {
  const getProbability = setInterval(async () => {
    let ProbabilityString = new Date(Math.floor(Math.floor(Date.now()) / 1000) * 1000).toUTCString().replace(" GMT", "")
    let probb = (await returnHashNumberWeighted(ProbabilityString + collision))
    document.getElementById('probability').innerText = probb + "%"
  }, 1000);
  return () => clearInterval(getProbability);
}, []);
  return (
    <div className="h-auto snap-proximity snap-y pb-[33vh] selection:bg-[#EDF6F9] selection:text-[#006D77] w-screen bg-[#006D77] text-[#ffffff]">
     <div className='absolute select-none z-0 flex top-[5vh] left-[calc(50vw-17vh)]'>
     <img className='w-[33vh] spin1deg' src="https://media-public.canva.com/ko27I/MAEoE-ko27I/1/s.png"/>
     </div>
     <div className='w-screen font-["Cherry_Swash"] flex flex-col z-20 relative'>
     <div onClick={()=>{document.getElementById("Hs").scrollIntoView()}} className='select-none snap-center h-screen w-screen flex flex-col justify-center'>
      <p className='mt-[5vh] text-[#E9C46A] text-center max-w-[80vw] select-none font-[Cinzel] font-thin self-center text-[5vh] md:text-[7vh] mb-[5vh]'>The  <a className='font-black'>A</a>nimal  <a className='font-black'>U</a>prising  <a className='font-black'>E</a>vent</p>
      <p className='font-thin h-[5vh] self-center text-[5vmin]' id="probability">{(1/12).toFixed(5)+"%"}</p>
      </div>
      <div id="Hs" className='snap-start overflow-y-scroll h-screen w-screen flex flex-col justify-start'>
      <p className='select-all font-["Cherry_Swash"] mt-[17vh] max-w-[90vw] self-center text-[4vmin] text-center'>Do not panic, it is inmninent but there are ways to preapare for the <a className='font-[Cinzel] font-thin text-[#E9C46A]'>The  <a className='font-black'>A</a>nimal  <a className='font-black'>U</a>prising  <a className='font-black'>E</a>vent</a></p>
      <div className='mb-[13vh] grid lg:grid-cols-3 grid-cols-1 mt-[7vh] self-center w-[90vw]'>
        <a onClick={()=>{}} className='cursor-pointer text-[4vmin] m-[3vh] place-self-center'>RCE formula</a>
        <a onClick={()=>{navigatee('/m')}} className='cursor-pointer text-[4vmin] m-[3vh] place-self-center'>AUE guides</a>
        <a href={pdf3} className='cursor-pointer text-[4vmin] m-[3vh] place-self-center'>Information</a>
      </div>
      <div className='h-[50vh] flex flex-col'>
    <RareFishesClass/>
</div>
      </div>
     </div>
    </div>
  );
}


function PDFSS(){
  return(
    <div className="h-screen text-[3vh] text-[#] flex flex-col justify-center snap-proximity snap-y selection:bg-[#EDF6F9] selection:text-[#006D77] w-screen bg-[#006D77] text-[#ffffff]">
      <div className='absolute select-none z-0 flex top-[33vh] left-[calc(50vw-17vh)]'>
     <img className='w-[33vh] spin1deg' src="https://media-public.canva.com/WrI8w/MAFG0gWrI8w/1/s.svg"/>
     </div>
     <div className='absolute select-none z-0 hidden md:flex top-[33vh] left-[calc(20vw-17vh)]'>
     <img className='w-[33vh] spin1deg' src="https://media-public.canva.com/WrI8w/MAFG0gWrI8w/1/s.svg"/>
     </div>
     <div className='absolute select-none z-0 hidden md:flex top-[33vh] right-[calc(20vw-17vh)]'>
     <img className='w-[33vh] spin1deg' src="https://media-public.canva.com/WrI8w/MAFG0gWrI8w/1/s.svg"/>
     </div>
    <a href={pdf1} className='h-[17vh] z-20 self-center bg-[#eeeeee40] hover:bg-[#eeeeee70] rounded-[2vh] p-[2vh] flex flex-col m-[3vh] justify-center w-[33vh] max-w-[90vw] text-center'>Survival Tips</a>
    <a href={pdf2} className='h-[17vh] z-20 text-[calc(2vh+0.7vh)] self-center bg-[#eeeeee40] hover:bg-[#eeeeee70] rounded-[2vh] p-[2vh] flex flex-col m-[3vh] justify-center w-[33vh] max-w-[90vw] text-center'>A Field Guide to Common
Wildlife Diseases and Parasites</a>
    <a href={pdf3} className='h-[17vh] z-20 self-center bg-[#eeeeee40] hover:bg-[#eeeeee70] rounded-[2vh] p-[2vh] flex flex-col m-[3vh] justify-center w-[33vh] max-w-[90vw] text-center'>Rainforest survival guide</a>

    </div>
  )
}


export {
  Overview, App, PDFSS}


  function Overview(){
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