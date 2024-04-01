// eslint-disable-next-line no-unused-vars
/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Container, Row, Col, Button, Input } from 'reactstrap';
import Helmet from '../components/Helmet';
import CommonSection from '../components/CommonSection';

const RentalList = () => {
    const [rentals, setRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [filteredRentals, setFilteredRentals] = useState([]);


    useEffect(() => {
        const fetchRentals = async () => {
            debugger
            try {
                const response = await fetch('http://localhost:5151/api/Rentals/getall');
                if (!response.ok) {
                    throw new Error('Failed to fetch rentals');
                }
                const data = await response.json();
                setRentals(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching rentals:', error.message);
                setLoading(false);
            }
        };

        fetchRentals();
    }, []);

    useEffect(() => {
        // Filter rentals based on status, phone number, and CNIC
        const filtered = rentals.filter(rental =>
            rental.status.toLowerCase().includes(filter.toLowerCase()) ||
            rental.phoneNumber.includes(filter) ||
            rental.cnic.includes(filter)
        );

        // Apply status filter if selected
        const filteredByStatus = selectedStatus === 'All' ? filtered : filtered.filter(rental => rental.status === selectedStatus);

        setFilteredRentals(filteredByStatus);
    }, [filter, rentals, selectedStatus]);

    const handleStatusChange = e => {
        setSelectedStatus(e.target.value);
    };

    const handleDelete = async id => {
        // Show confirmation dialog before deleting
        const confirmDelete = window.confirm('Are you sure you want to delete this rental?');
        if (!confirmDelete) {
            return; // If user cancels, exit the function
        }

        try {
            const response = await fetch(`http://localhost:5151/api/Rentals/Delete/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete rental');
            }
            setRentals(rentals.filter(rental => rental.id !== id));
            alert('Rental deleted successfully');
        } catch (error) {
            console.error('Error deleting rental:', error.message);
        }
    };

    function calculateDescription(returnDate, status) {
        const returnDateObj = new Date(returnDate);
        const today = new Date();
        const daysDifference = Math.ceil((today - returnDateObj) / (1000 * 60 * 60 * 24));

        if (status === 'OnRent') {
            return daysDifference > 0 ? `${daysDifference} days overdue, Fine: $${50 * daysDifference}` : `${-daysDifference} days left`;
        } else if (status === 'Pending') {
            return `${daysDifference} days remaining`;
        } else {
            return 'Check In';
        }
    };

    return (
        <Helmet title="Car-Listing">
            <section className="pt-0">
                <CommonSection title="Rental Listing" />
            </section>
            <section className="pt-0">
                <Container>
                    <Row>
                        <Col>
                            <h2 className="mb-4">Rental List</h2>
                            <div className="d-flex align-items-center gap-1 mb-2">
                                <span style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '16px' }}>Search By :</span>
                                <Input
                                    type="text"
                                    placeholder=" Phone number, or CNIC"
                                    value={filter}
                                    onChange={e => setFilter(e.target.value)}
                                    className="mb-3"
                                    style={{ width: '190px', height: '35px', border: '1px solid black', outline: 'none' }}
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
                            {loading ? (
                                <p>Loading...</p>
                            ) : (
                                <Table striped bordered responsive>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Car ID</th>
                                            <th>Phone Number</th>
                                            <th>CNIC Number</th>
                                            <th>Rent Date</th>
                                            <th>Return Date</th>
                                            <th>Status</th>
                                            <th>Daily Price</th>
                                            <th>Description</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredRentals.map(rental => (
                                            <tr key={rental.id}>
                                                <td>{rental.name}</td>
                                                <td>{rental.carId}</td>
                                                <td>{rental.phoneNumber}</td>
                                                <td>{rental.cnic}</td>
                                                <td>{new Date(rental.rentDate).toLocaleDateString()}</td>
                                                <td>{rental.returnDate ? new Date(rental.returnDate).toLocaleDateString() : '-'}</td>
                                                <td>{rental.status}</td>
                                                <td>{rental.dailyPrice}</td>
                                                <td>{rental.returnDate ? calculateDescription(rental.returnDate, rental.status) : '-'}</td>
                                                <td style={{ display: 'flex' }}>
                                                    <Link to={`/updateRental/${rental.carId}`}>
                                                        <Button color="primary" size="sm" className="me-1">Edit</Button>
                                                    </Link>
                                                    <Button
                                                        color="danger"
                                                        size="sm"
                                                        // className="mb-1"
                                                        onClick={() => handleDelete(rental.id)}
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

export default RentalList;







// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Table, Container, Row, Col, Button } from 'reactstrap';
// import Helmet from '../components/Helmet';
// import CommonSection from '../components/CommonSection';

// const RentalList = () => {
//     const [rentals, setRentals] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchRentals = async () => {
//             try {
//                 const response = await fetch('http://localhost:5151/api/Rentals/getall');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch rentals');
//                 }
//                 const data = await response.json();
//                 // debugger
//                 setRentals(data);
//                 console.log(data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching rentals:', error.message);
//                 setLoading(false);
//             }
//         };

//         fetchRentals();
//     }, []);

//     function calculateDescription(returnDate, status) {
//         const returnDateObj = new Date(returnDate);
//         const today = new Date();
//         const daysDifference = Math.ceil((today - returnDateObj) / (1000 * 60 * 60 * 24));

//         if (status === 'OnRent') {
//             return daysDifference > 0 ? `${daysDifference} days overdue, Fine: $${50 * daysDifference}` : `${-daysDifference} days left`;
//         } else if (status === 'Pending') {
//             return `${daysDifference} days remaining`;
//         } else {
//             return 'Check In';
//         }
//     }




//     return (
//         <Helmet title="Car-Listing">
//             <section className="pt-0">
//                 <CommonSection title="Rental Listing" />
//             </section>
//             <section className="pt-0">
//                 <Container>
//                     <Row>
//                         <Col>
//                             <h2 className="mt-4 mb-4">Rental List</h2>
//                             {loading ? (
//                                 <p>Loading...</p>
//                             ) : (
//                                 <Table striped bordered responsive>
//                                     <thead>
//                                         <tr>
//                                             <th>Name</th>
//                                             <th>Car ID</th>
//                                             <th>Phone Number</th>
//                                             <th>CNIC Number</th>
//                                             <th>Rent Date</th>
//                                             <th>Return Date</th>
//                                             <th>Status</th>
//                                             <th>Daily Price</th>
//                                                 <th style={{ display: 'flex', alignItems: 'center' }}>
//                                                     Description
//                                                     <span style={{ marginLeft: 'auto' }}>
//                                                         <info title="We Charge $50/day after due date">⍰</info>
//                                                     </span>
//                                                 </th>

//                                             {/* <th>Description   <info title="We Charge 500/day after due date"> ⍰ </info></th> */}
//                                             <th>Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         {rentals.map((rental, index) => (
//                                             <tr key={index}>
//                                                 <td>{rental.name}</td>
//                                                 <td>{rental.carId}</td>
//                                                 <td>{rental.phoneNumber}</td>
//                                                 <td>{rental.cnic}</td>
//                                                 <td>{new Date(rental.rentDate).toLocaleDateString()}</td>
//                                                 <td>{rental.returnDate ? new Date(rental.returnDate).toLocaleDateString() : '-'}</td>
//                                                 <td>{rental.status}</td>
//                                                 <td>{rental.dailyPrice}</td>
//                                                 <td>{rental.returnDate ? calculateDescription(rental.returnDate, rental.status) : '-'}</td>
//                                                 <td>
//                                                     <Link to={`/updateRental/${rental.id}`}>
//                                                         <Button color="primary" size="sm">Edit</Button>
//                                                     </Link>
//                                                     <Link to={`/updateRental/${rental.id}`}>
//                                                         <Button color="danger" size="sm">Delete</Button>
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

// export default RentalList;









// import React, { useState, useEffect } from 'react';
// import { Table, Container, Row, Col, Button } from 'reactstrap';
// import { Link } from 'react-router-dom';


// const RentalList = () => {
//     const [rentals, setRentals] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchRentals = async () => {
//             try {
//                 const response = await fetch('http://localhost:5151/api/Rentals/getall');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch rentals');
//                 }
//                 const data = await response.json();
//                 setRentals(data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching rentals:', error.message);
//                 setLoading(false);
//             }
//         };

//         fetchRentals();
//     }, []);

//     return (
//         <Container>
//             <Row>
//                 <Col>
//                     <h2 className="mt-4 mb-4">Rental List</h2>
//                     {loading ? (
//                         <p>Loading...</p>
//                     ) : (
//                         <Table striped bordered responsive>
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     {/* <th>Id</th> */}
//                                     <th>Car ID</th>
//                                     <th>Phone Number</th>
//                                     <th>Rent Date</th>
//                                     <th>Return Date</th>
//                                     <th>Status</th>
//                                     <th>Actions</th> {/* Add this column for the update button */}
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {rentals.map((rental, index) => (
//                                     <tr key={index}>
//                                         <td>{rental.name}</td>
//                                         {/* <td>{rental.id}</td> */}
//                                         <td>{rental.carId}</td>
//                                         <td>{rental.phoneNumber}</td>
//                                         <td>{new Date(rental.rentDate).toLocaleDateString()}</td>
//                                         <td>{rental.returnDate ? new Date(rental.returnDate).toLocaleDateString() : '-'}</td>
//                                         <td>{rental.status}</td>
//                                         <td>
//                                             <Link to={`/updateRental/${rental.id}`}>
//                                                 <Button color="primary" size="sm">Update</Button>
//                                             </Link>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </Table>
//                     )}
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default RentalList;














// import React, { useState, useEffect } from 'react';
// import { Table, Container, Row, Col } from 'reactstrap';

// const RentalList = () => {
//     const [rentals, setRentals] = useState([]);
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         const fetchRentals = async () => {
//             try {
//                 const response = await fetch('http://localhost:5151/api/Rentals/getall');
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch rentals');
//                 }
//                 const data = await response.json();
//                 setRentals(data);
//                 setLoading(false);
//             } catch (error) {
//                 console.error('Error fetching rentals:', error.message);
//                 setLoading(false);
//             }
//         };

//         fetchRentals();
//     }, []);

//     return (
//         <Container>
//             <Row>
//                 <Col>
//                     <h2 className="mt-4 mb-4">Rental List</h2>
//                     {loading ? (
//                         <p>Loading...</p>
//                     ) : (
//                         <Table striped bordered responsive>
//                             <thead>
//                                 <tr>
//                                     <th>Name</th>
//                                     <th>Car ID</th>
//                                     <th>Phone Number</th>
//                                     <th>Rent Date</th>
//                                     <th>Return Date</th>
//                                     <th>Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {rentals.map((rental, index) => (
//                                     <tr key={index}>
//                                         <td>{rental.name}</td>
//                                         <td>{rental.carId}</td>
//                                         <td>{rental.phoneNumber}</td>
//                                         <td>{new Date(rental.rentDate).toLocaleDateString()}</td>
//                                         <td>{rental.returnDate ? new Date(rental.returnDate).toLocaleDateString() : '-'}</td>
//                                         <td>{rental.status}</td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </Table>
//                     )}
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default RentalList;
