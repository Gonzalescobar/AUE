import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {Overview} from './App';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {register} from './serviceWorkerRegistration';

async function update(){
  if(!window.localStorage.cacheExpiration){
    window.localStorage.cacheExpiration = Date.now()+1000*60*60*24
    window.localStorage.cacheExpirationDate = new Date(Date.now()+1000*60*60*24) 
  }else{
    if(parseFloat(window.localStorage.cacheExpiration) < Date.now()){
      window.localStorage.cacheExpiration = Date.now()+1000*60*60*24
      window.localStorage.cacheExpirationDate = new Date(Date.now()+1000*60*60*24) 
      for(let keys of await caches.keys()){caches.delete(keys)}
      alert('Information updated, will update again in 24 houurs')
      setTimeout(()=>{window.location.reload()}, 500)
    }else{
    }
  }
  }
  if(window.navigator.onLine){update()}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
  <Route path="/overview" element={<Overview/>} />

</Routes>
</BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
register();

