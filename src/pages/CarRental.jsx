import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config/config';
import useFetch from '../hooks/useFetch';
import { Button } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import { Container, Row } from 'reactstrap';
import CarCard from '../components/CarCard';
import { Link } from 'react-router-dom';
import '../styles/pagination.css';

import Helmet from '../components/Helmet';
import CommonSection from '../components/CommonSection';

const CarRental = () => {
  const { data: carData, isPending, error } = useFetch(`${BASE_URL}/Cars/getall`);
  const [pageNumber, setPageNumber] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const carPerPage = 6;
  const visitedPage = pageNumber * carPerPage;

  // Filter cars based on selected status
  const filteredCars = selectedStatus === 'All' ? carData : carData.filter(car => car.status === selectedStatus);

  const sortedCars = filteredCars.sort((a, b) => {
    // Sorting based on status: OnRent first, then Available
    if (a.status === 'OnRent' && b.status !== 'OnRent') return 1;
    if (a.status !== 'OnRent' && b.status === 'OnRent') return -1;
    return 0;
  });

  const displayPage = sortedCars
    .slice(visitedPage, visitedPage + carPerPage)
    .map(item => <CarCard key={item.id} item={item} />);

  const pageCount = Math.ceil(sortedCars.length / carPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const handleStatusChange = e => {
    setSelectedStatus(e.target.value);
    setPageNumber(0); // Reset page number when changing status filter
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [carData]);

  useEffect(() => {
    if (carData) {
      // Store carId in session storage when carData is fetched
      carData.forEach(item => {
        sessionStorage.setItem(`carId_${item.id}`, item.id);
      });
    }
  }, [carData]);

  return (
    <Helmet title="Car-Listing">
      <section className="pt-0">
        <CommonSection title="Car Listing" />
      </section>
      <section className="pt-0">
        <Container>
          <Row>
            {isPending && <h6 className="text-center">Loading......</h6>}
            {error && <h6 className="text-center">{error}</h6>}
            {/* <div className="d-flex align-items-center mb-3 gap-3 car__filter">
              <span className="d-flex align-items-center gap-1">
                Filter By Status:
              </span>
              <select value={selectedStatus} onChange={handleStatusChange}>
                <option value="All">All</option>
                <option value="OnRent">On Rent</option>
                <option value="Available">Available</option>
              </select>
            </div> */}

            <div className="d-flex align-items-center mb-2 gap-3 car__sorting">
              <span className="d-flex align-items-center gap-1">
                <i className="ri-sort-asc"></i> Sort By
              </span>
              <select value={selectedStatus} onChange={handleStatusChange} style={{ width: '150px' }}>
                <option value="All">All</option>
                <option value="OnRent">On Rent</option>
                <option value="Available">Available</option>
              </select>
              <div style={{ marginLeft: 'auto' }}>
                <Button className="w-30 carItem__btn carItem__btn-rent">
                  <Link to="/addCars">Add Car</Link>
                </Button>
              </div>
            </div>

            {displayPage}
            <div>
              <ReactPaginate
                previousLabel={'Prev'}
                nextLabel={'Next'}
                pageCount={pageCount}
                onPageChange={changePage}
                containerClassName="paginationBttns"
              />
            </div>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default CarRental;

