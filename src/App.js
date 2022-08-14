import React from 'react';
import './App.css';
import {useNavigate} from 'react-router-dom'
import flower1 from './flower1.png'

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
        <p className='sm:text-[3vh] text-[#444444] mt-[3vh]   text-[2.1vh] text-center self-center'>{"Current Risk: " + this.getPercentage() + "%"}</p>
        <p className='sm:text-[3vh] text-[#444444] font-bold mt-[1vh] text-[2.1vh] text-center self-center'>{"Acumulated Risk during the last 24 hours: " + this.state.TFpercentage + "%"}</p>
        <p className='sm:text-[3vh] text-[#444444] font-light mt-[1vh] flex flex-row text-[2.1vh] text-center self-center'><p className='font-bold mr-[1vh]'>Current Threats: </p>{" " + collision}</p>
        <div className='flex cursor-default mt-[1vh] flex-row justify-center'>
          <p className='sm:text-[3vh] text-[#444444] text-[2.1vh] m-[1vh] text-center self-center'>{this.getTimeArray(1)}</p>
          <p className='sm:text-[3vh] text-[#444444] text-[2.1vh] m-[1vh] text-center self-center'>{this.getTimeArray(2)}</p>
          <p className='sm:text-[3vh] text-[#444444] text-[2.1vh] m-[1vh] text-center self-center'>{this.getTimeArray(3)}</p>
          <p className='sm:text-[3vh] text-[#444444] text-[2.1vh] m-[1vh] text-center self-center'>{this.getTimeArray(4)}</p>
          <p className='sm:text-[3vh] text-[#444444] text-[2.1vh] m-[1vh] text-center self-center'>{"GMT"}</p>
        </div>
        <p className='m-[3vh]  sm:text-[2.7vh] text-[#444444] text-[1.9vh] text-center self-center'>{"The standard risk of an Animal Uprising Event happening is 1/12 every 24 hours"}</p>
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
    <div className="h-auto snap-proximity snap-y pb-[33vh] selection:bg-[#444444] selection:text-slate-100 w-screen bg-slate-200 text-[#4444444]">
     <div className='absolute h-screen flex-col justify-center select-none z-0 w-screen overflow-hidden flex'>
     <img className='w-[33vh] spin1deg self-center' src={flower1}/>
     </div>
     <div className='w-screen font-["Cherry_Swash"] flex flex-col z-20 relative'>
     <div onClick={()=>{document.getElementById("Hs").scrollIntoView()}} className='select-none snap-center h-screen w-screen flex flex-col justify-center'>
      <p className='mt-[5vh] text-[#E9C46A] text-center max-w-[80vw] select-none font-[Cinzel] font-thin self-center text-[5vh] md:text-[7vh] mb-[5vh]'>The  <a className='font-black'>A</a>nimal  <a className='font-black'>U</a>prising  <a className='font-black'>E</a>vent</p>
      <p className='font-thin h-[5vh] self-center text-[5vmin]' id="probability">{(1/12).toFixed(5)+"%"}</p>
      </div>
      
      <div id="Hs" className='snap-start pb-[17vh] overflow-y-scroll h-screen w-screen flex flex-col justify-start'>
      <p className='select-all mt-[17vh] font-["Cherry_Swash"] w-[100vh] max-w-[90vw] self-center text-justify text-[3.3vmin]'>AUE (Animal Uprising Event) is the name for upcoming incidents where animals will try to overcome humans for various reasons, including: destroying their natural habitats, deforestation, environmental pollution and abuse.</p>
      <p className='select-all mb-[1vh] w-[100vh] font-["Cherry_Swash"] mt-[17vh] max-w-[90vw] self-center text-[4vmin] text-center'>Do not panic, it is inmninent, preapare for the <a className='font-[Cinzel] font-thin text-[#E9C46A]'>The  <a className='font-black'>A</a>nimal  <a className='font-black'>U</a>prising  <a className='font-black'>E</a>vent</a> instead</p>
      <div className='flex flex-col'>
    <RareFishesClass/>
</div>
     </div>
     </div>
    </div>
  );
}


export {
  Overview, App, }


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
an Animal Uprising Event is an Animal Uprising Event that's mostly asociated with primates.
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