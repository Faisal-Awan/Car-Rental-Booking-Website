import React from 'react';
import { Col, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/car-card.css';

const CarCard = ({ item }) => {


  function calculateDescription(returnDate, status) {
    const returnDateObj = new Date(returnDate);
    const today = new Date();
    const daysDifference = Math.ceil((today - returnDateObj) / (1000 * 60 * 60 * 24));

    if (status === 'OnRent') {
      return daysDifference > 0 ? `${daysDifference} days overdue, Fine: $${50 * daysDifference}` : ` OnRent: ${-daysDifference} days left`;
    } else if (status === 'Pending') {
      return  ` ${daysDifference} days remaining`;
    } else {
      return 'Available';
    }
  }


  return (
    <>

      <Col lg="4" md="4" sm="6" className="mb-5">

        <div className="carItem">
          <div className="car__item-img ">
            <img src={`/images/${item.id}.png`} alt="BMW Offer" className="w-100" />
          </div>
          <div className="car__item-content mt-4">
            <h4 className="section__title text-center">{item.carName}</h4>
            <h6 className="rent__price text-center mt-4">
              ${item.dailyPrice}.00 <span>/ Day</span>
            </h6>

            <div className="car__item-info d-flex justify-content-between align-items-center mt-3 mb-4">
              <span className=" d-flex align-items-center gap-1">
                <i className="ri-car-line"></i> {item.carName}
              </span>
              <span className=" d-flex align-items-center gap-1">
                <i className="ri-car-line"></i> {item.carNumber}
              </span>
              <span className=" d-flex align-items-center gap-1">
                <i className="ri-car-line"></i> {item.modelYear}
              </span>
            </div>

            <div className="car__item-info d-flex justify-content-between align-items-center mt-2 mb-2">
              {(item.status === 'OnRent' || item.status === 'Available') && (
                <>
                  <span className="d-flex align-items-center gap-1">
                    Rent Date: {item.status === 'OnRent' ? new Date(item.rentDate).toLocaleDateString() : '-'}
                  </span>
                  <span className="d-flex align-items-center gap-1">
                    Return Date: {item.status === 'OnRent' && item.returnDate ? new Date(item.returnDate).toLocaleDateString() : '-'}
                  </span>
                </>
              )}
            </div>
            <div className="car__item-info d-flex justify-content-center align-items-center mt-2 mb-2">
              <span className={`d-flex align-items-center gap-1 ${item.status === 'Available' ? 'bg-success text-white' : 'bg-danger text-white'}`} style={{width:'100%', textAlign: 'center', justifyContent:'center', fontWeight: 'bold' }}>
                {(item.status === 'OnRent' || item.status === 'Available') ? calculateDescription(item.returnDate, item.status) : '-'}
              </span>
            </div>

            {item.status !== "OnRent" ? (
              <Button className="w-50 carItem__btn carItem__btn-rent">
                <Link to={`/personDetail/${item.id}`}>RENT</Link>
              </Button>
            ) : (

              <Button className="w-50 carItem__btn carItem__btn-rent">
                <Link to={`/updateRental/${item.id}`}>Update</Link>
              </Button>
            )}
            <Button className="w-50 carItem__btn carItem__btn-details">
              <Link to={`/car-details/${item.id}`}>Details</Link>
            </Button>
          </div>
        </div>
      </Col>
    </>
  );
};

export default CarCard;



















// {/* <div className="car__item-info d-flex justify-content-between align-items-center mt-2 mb-2">
//               <span className=" d-flex align-items-center gap-1">
//                 Rent Date: {new Date(item.rentDate).toLocaleDateString()}
//               </span>
//               <span className=" d-flex align-items-center gap-1">
//                 Return Date: {item.returnDate ? new Date(item.returnDate).toLocaleDateString() : '-'}
//               </span>
//             </div>
//             <div className="car__item-info d-flex justify-content-between align-items-center mt-2 mb-2">
//               <span className=" d-flex align-items-center gap-1" style={{ background: 'Red', color: 'white', fontWeight: 'bold' }}>
//                 {item.returnDate ? calculateDescription(item.returnDate, item.status) : '-'}
//               </span>
//             </div> */}
// {/* if(item.status != "OnRent"){
//               <Button className="w-50 carItem__btn carItem__btn-rent">
//                 <Link to={`/personDetail/${item.carId}`}>RENT</Link>
//               </Button>
//             } */}