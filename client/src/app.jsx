import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Helpers from './helpers.js';
import ProductOverview from './components/ProductOverview.jsx';
import VarianceOverview from './components/VarianceOverview.jsx';
import exampleData from './data/exampleData.js';
import GlobalStyle from './globalStyle/createGlobalStyle.jsx'
import Sidebar from './components/Sidebar.jsx'

const Module = styled.div`
  padding: 0 5rem 0 1.5rem;
  margin-top: 2.5rem;
  position: absolute;
  right: 0;
  width: 25rem;
`;

const Pane = styled.div`
  position: fixed;
  left: 0;
  background-color: rgba(0, 0, 0, 0.15);
  height: 100vh;
  width: 100vw;
`;

const App = () => {

const [data, setData] = useState(exampleData)
data.reviewsAverages = Helpers.calculateAverages(data.reviews);

const [sidebarClicked, setSidebarClicked] = useState(false);
const [sidebarToRender, setSidebarToRender] = useState('');


  return (
    <div>
      {sidebarClicked && <Pane onClick={() => setSidebarClicked(false)} />}
      <Sidebar data={data} sidebarClicked={sidebarClicked} setSidebarClicked={setSidebarClicked} sidebarToRender={sidebarToRender}/>
    <Module>
      <GlobalStyle />
      <ProductOverview data={data} setSidebarToRender={setSidebarToRender} setSidebarClicked={setSidebarClicked}/>
      <VarianceOverview options={{name: 'Color', choices: data.colors}} setSidebarToRender={setSidebarToRender} setSidebarClicked={setSidebarClicked}  />
      <VarianceOverview options={{name: 'Size', choices: data.sizes}} setSidebarToRender={setSidebarToRender} setSidebarClicked={setSidebarClicked}  />
    </Module>
    </div>

  )
};

ReactDOM.render(<App />, document.getElementById("app"));