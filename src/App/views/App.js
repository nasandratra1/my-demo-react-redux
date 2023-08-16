/*import logo from './logo.svg';*/
import React, { Fragment, useState, useEffect } from "react";
import { Navbar } from "../components"

import { BrowserRouter as Router , Route} from 'react-router-dom'
import { Cart } from "./Cart"
import { Home } from "./Home"
import '../styles/App.css';
import { list } from "../data.js"

const SideMenu = ({ loadCategory, category }) => {
  const links = ["Fruits", "Legumes", "Produits frais", "Epicerie", "Boissons"]
  return (
    <div className="col-sm-2 sidebar">
            <ul>
              {links.map((link, index) => {
                //return(<li key={index} onClick={() => loadCategory(index)}></li>)
                return(
                  <li className={category === index ? "active-link" : ""} key={index} onClick={() => loadCategory(index)}>{link}</li>
                  //<li className={category === index ? "active" : ""} key={index} onClick={() => loadCategory(index)}>{link}</li>
                  //<li className={category == index && 'active'} key={index} onClick={() => loadCategory(index)}>{link}</li>
                )
              })}
            </ul>
    </div>
  )
}


const App = () => {
  const [category, setCategory] = useState(0)
  const [isFiltering, setFiltering] = useState(false)
  const [filtered, setfiltered] = useState(false)
  const [count, setCount] = useState(1);
  const loadCategory = i => {setCategory(i)}
  const filterResults = input => {
    let fullList = list.flat()
    let results = fullList.filter(item => {
      const name = item.name.toLowerCase()
      const term = input.toLowerCase()
      return name.includes(term)
    })
    setfiltered(results)
    setFiltering(true)
  }  
    useEffect(() => {
    console.log(isFiltering)
  }, [isFiltering]);
  return (
    <Fragment>
      <Router>
      <Navbar filter={filterResults} setFiltering={setFiltering} count={count}/>
      {/*Routes*/}
      <Route exact path="/" component={() =><Home 
                                                category={category} 
                                                loadCategory={loadCategory} 
                                                addToCart={setCount} 
                                                count={count}
                                                list={list}
                                                isfiltering={isfiltering}
                                                filtered={filtered}/>
                                                }/>
      <Route path="/cart" component={Cart}/>
      </Router>
      </Fragment>
  );
}

export default App;