import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import Paginator from "../Paginator/Paginator";
import AllProfile from "../AllProfile/AllProfile";
import "./Search.css";
function SearchBar({ placeholder,value }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [postLoading, setPostLoading] = useState(true);
  let domainArray = [];
  let data = [];
  let newFilter = [];
  let v = [];
  let domainResult = [];
  
  fetch("http://localhost:8080/search")
    .then((res) => {
      return res.json();
    })
    .then((resData) => {
      data.push(
        resData.profiles.map((post) => {
          return { ...post };
        })
      );
    })
    .catch((err) => {
      console.log(err);
    });
  // console.log(data);
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);
   
    for (let i in data) {
   
      newFilter = data[i].map((inner) => {
     
        domainArray = (inner.domain.split("\n"));
        if (
          inner.college
            .toLowerCase()
            .trim()
            .includes(searchWord.toLowerCase().trim())
        ) {
          setIsValid(true);
          return { ...inner };
        } 
        
        else{
          domainResult = (domainArray.map(element=>{
            if(element.toLowerCase().trim().includes(searchWord.toLowerCase().trim()))
            {
            
              
              
              return {...inner};
            }
          }))
        
          for(i in domainResult)
          {
            if(domainResult[i]!==undefined)
            {
              setIsValid(true);
              return {...inner};
               
            }
          }
          
        }
      });
      
      setPostLoading(false);
    }
    v = newFilter.map((data) => {
      return { ...data };
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(v);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setPostLoading(true);
    setWordEntered("");
  };
  // console.log(filteredData, "*/*");
  return (
    <React.Fragment>
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {wordEntered.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
        <section className="searchFeed">
          {postLoading && <span>Welcome To ProReviews</span>}
          {isValid && (
            <Paginator>
              {filteredData.map((result) => {
               
                if(result.name!==undefined)
                {
                  return (
                    <AllProfile
                      image={result.image}
                      name={result.name}
                      college={result.college}
                      breif={result.breif}
                      id={result._id}
                      key={result._id}
                    />
                  );
                }
                
              })}
            </Paginator>
          )}
        </section>
      </div>
    </React.Fragment>
  );
}

export default SearchBar;
