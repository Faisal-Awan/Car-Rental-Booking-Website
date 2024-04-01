import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Container, Row, Col, Button } from 'reactstrap';
import Helmet from '../components/Helmet';
import CommonSection from '../components/CommonSection';

const CarList = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectedCarNumber, setSelectedCarNumber] = useState('');

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await fetch('http://localhost:5151/api/Cars/getall');
                if (!response.ok) {
                    throw new Error('Failed to fetch Cars');
                }
                const data = await response.json();
                setCars(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching Cars:', error.message);
                setLoading(false);
            }
        };

        fetchCars();
    }, []);

    const handleStatusChange = event => {
        setSelectedStatus(event.target.value);
    };

    const handleCarNumberChange = event => {
        setSelectedCarNumber(event.target.value);
    };

    const handleDelete = async id => {
        const confirmDelete = window.confirm('Are you sure you want to delete this car?');
        if (!confirmDelete) {
            return; // If user cancels, exit the function
        }

        try {
            const response = await fetch(`http://localhost:5151/api/Cars/Delete/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete car');
            }
            setCars(cars.filter(car => car.id !== id));
            alert('Car deleted successfully');
        } catch (error) {
            console.error('Error deleting car:', error.message);
        }
    };

    const filteredCars = cars.filter(car => {
        if (selectedStatus !== 'All' && car.status !== selectedStatus) {
            return false;
        }
        if (selectedCarNumber && !car.carNumber.includes(selectedCarNumber)) {
            return false;
        }
        return true;
    });

    return (
        <Helmet title="Car-Listing">
            <section className="pt-0">
                <CommonSection title="Car Listing" />
            </section>
            <section className="pt-0">
                <Container>
                    <Row>
                        <Col>
                            <div className="d-flex align-items-center gap-1 mb-2">
                                <span style={{  fontWeight: 'bold', fontSize: '18px' }}>Find By:</span>
                                <input
                                    type="text"
                                    value={selectedCarNumber}
                                    onChange={handleCarNumberChange}
                                    placeholder="Enter Car Number"
                                    style={{ width: '200px', height: '30px' }}
                                />
                            </div>

                            <div className="d-flex align-items-center gap-1 mb-3">
                                <span className="d-flex align-items-center gap-1">
                                    <i className="ri-sort-asc"></i> Sort By
                                </span>
                                <select
                                    value={selectedStatus}
                                    onChange={handleStatusChange}
                                    style={{ width: '200px', height: '30px' }}
                                >
                                    <option value="All">All</option>
                                    <option value="OnRent">On Rent</option>
                                    <option value="Available">Available</option>
                                </select>

                            </div>

                            <h2 className="mt-4 mb-4">Car List</h2>
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <Table striped bordered responsive>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Car Name</th>
                                            <th>Car Number</th>
                                            <th>Model Year</th>
                                            <th>Daily Price</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredCars.map(car => (
                                            <tr key={car.id}>
                                                <td>{car.id}</td>
                                                <td>{car.carName}</td>
                                                <td>{car.carNumber}</td>
                                                <td>{car.modelYear}</td>
                                                <td>{car.dailyPrice}</td>
                                                <td>{car.status}</td>
                                                <td>
                                                    <Link to={`/updateCar/${car.id}`}>
                                                        <Button color="primary" size="sm" className="me-1">Edit</Button>
                                                    </Link>
                                                    <Button
                                                        color="danger"
                                                        size="sm"
                                                        onClick={() => handleDelete(car.id)}
                                                        style={{ backgroundColor: 'red', borderColor: 'red' }}
                                                    >
                                                        Delete
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            )}
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default CarList;








// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Table, Container, Row, Col, Button } from 'reactstrap';
// import Helmet from '../components/Helmet';
// import CommonSection from '../components/CommonSection';

// const CarList = () => {
//     const [cars, setCars] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchCars = async () => {
//             try {
//                 const response = await fetch('http://localhost:5151/api/Cars/getall');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch Cars');
//                 }
//                 const data = await response.json();
//                 // debugger
//                 setCars(data);
//                 console.log(data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching Cars:', error.message);
//                 setLoading(false);
//             }
//         };

//         fetchCars();
//     }, []);

//     return (
//         <Helmet title="Car-Listing">
//             <section className="pt-0">
//                 <CommonSection title="Car Listing" />
//             </section>
//             <section className="pt-0">
//                 <Container>
//                     <Row>
//                         <Col>
//                             <h2 className="mt-4 mb-4">Car List</h2>
//                             {loading ? (
//                                 <p>Loading...</p>
//                             ) : (
//                                 <Table striped bordered responsive>
//                                     <thead>
//                                         <tr>
//                                             <th>ID</th>
//                                             <th>Car Name</th>
//                                             <th>Car Number</th>
//                                             <th>Model Year</th>
//                                             <th>Daily Price</th>
//                                             <th>Status</th>
//                                             <th>Action</th>
//                                             {/* <th>Description</th> */}
//                                             {/* <th>Status</th> */}
//                                             {/* <th>Actions</th> */}
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {cars.map((car, index) => (
//                                             <tr key={index}>
//                                                 <td>{car.id}</td>
//                                                 <td>{car.carName}</td>
//                                                 <td>{car.carNumber}</td>
//                                                 {/* <td>{car.carId}</td> */}
//                                                 <td>{car.modelYear}</td>
//                                                 <td>{car.dailyPrice}</td>
//                                                 <td>{car.status}</td>
//                                                 {/* <td>{car.description}</td> */}

//                                                 {/* <td>{new Date(car.rentDate).toLocaleDateString()}</td> */}
//                                                 {/* <td>{car.returnDate ? new Date(car.returnDate).toLocaleDateString() : '-'}</td> */}
//                                                 <td>
//                                                     <Link to={`/updateCar/${car.id}`}>
//                                                         <Button color="primary" size="sm">Edit</Button>
//                                                     </Link>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </Table>
//                             )}
//                         </Col>
//                     </Row>
//                 </Container>
//             </section>
//         </Helmet>
//     );
// };

// export default CarList;
