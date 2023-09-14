// src/App.js
import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import Content from './components/Content';

function App() {
  const [activeTab, setActiveTab] = useState('NFL');

  return (
    <div className="App">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      <Content activeTab={activeTab} />
    </div>
  );
}

export default App;
