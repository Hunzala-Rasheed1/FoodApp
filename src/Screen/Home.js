import React, { useEffect, useState } from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer';
import Card from '../component/Card';


export default function Home() {
  const [search, setsearch] = useState('');
  const [dataitem, setitem] = useState([]);
  const [dataCat, setCat] = useState([]);

  const LoadData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/DisplayData", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      setitem(data.foodItem);
      setCat(data.categoryData);

      console.log("working");
      console.log(dataitem); // Log the value of dataitem
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  useEffect(() => {
    LoadData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="container position-relative">
        <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={`https://source.unsplash.com/random/900x500/?burger${search && `&query=${search}`}`} className="d-block w-100" alt="Burger" />
            </div>
            <div className="carousel-item">
              <img src={`https://source.unsplash.com/random/900x500/?cake${search && `&query=${search}`}`} className="d-block w-100" alt="Cake" />
            </div>
            <div className="carousel-item">
              <img src={`https://source.unsplash.com/random/900x500/?pizza${search && `&query=${search}`}`} className="d-block w-100" alt="Pizza" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>


          <div className="carousel-caption" style={{ zIndex: "20" }}>
            <div className="d-flex">
              <input className="form-control me-2" type="search" placeholder="Search Images" aria-label="Search" value={search} onChange={(e) => { setsearch(e.target.value) }} />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {dataCat != null ? (
          dataCat.map((data) => {
            return (
              <div className='row mb-3' >
                <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
                <hr />
                {dataitem != null ? (
                  dataitem
                    .filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase())))
                    .map((Filteritem) => {
                      return (
                        <div key={Filteritem._id} className="col 12 col-md-6 col-lg-3">
                          <Card foodItem={Filteritem}
                            option={Filteritem.options[0]}
                            
                          />
                        </div>
                      );
                    })
                ) : null}
              </div>
            );
          })
        ) : (
          <div>Categories are null</div>
        )}
      </div>
      <Footer />
    </div>
  );
}
