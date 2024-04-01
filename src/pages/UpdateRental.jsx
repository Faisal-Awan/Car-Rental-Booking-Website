import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Helmet from '../components/Helmet';
import CommonSection from '../components/CommonSection';

const UpdateRentalForm = () => {
    const navigate = useNavigate();
    const { CarId } = useParams(); // Get the id parameter from the URL
    const [formData, setFormData] = useState({
        // id:'',
        name: '',
        carId: CarId,
        phoneNumber: '',
        rentDate: '',
        returnDate: '',
        status: '',
        dailyPrice: '',
        decription: '',
        cnic: '',
    });

    useEffect(() => {
        debugger
        const fetchRentalData = async () => {
            try {
                const response = await axios.get(`http://localhost:5151/api/Rentals/GetRentalByCarId/${CarId}`);
                const rentalData = response.data;
                const rentDate = new Date(rentalData.rentDate);
                const returnDate = new Date(rentalData.returnDate);
                setFormData({
                    name: rentalData.name,
                    carId: CarId,
                    phoneNumber: rentalData.phoneNumber,
                    cnic: rentalData.cnic,
                    rentDate: rentDate.toISOString().split('T')[0],
                    returnDate: returnDate.toISOString().split('T')[0],
                    status: rentalData.status
                });
            } catch (error) {
                console.error('Error fetching rental data:', error);
            }
        };

        fetchRentalData();
    }, [CarId]);

    const handleChange = e => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async e => {
        e.preventDefault();
        debugger;
        try {
            formData.carId=CarId;
            const response = await axios.put(`http://localhost:5151/api/Rentals/UpdateByCarId/${CarId}`, formData);
            console.log(formData);
            if (response.status !== 200) {
                throw new Error('Failed to update rental');
            }
            alert('Rental updated successfully');

            navigate('/rentalList');
            // Handle success (e.g., show a success message)
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error('Error updating rental:', error.message);
        }
    };

    return (
        <Helmet title="Car-Listing">
            <section className="pt-0">
                <CommonSection title="Update Rental Listing" />
            </section>
            <section className="pt-0">
                <Container>
                    <Row>
                        <Col md={{ size: 6, offset: 3 }}>
                            <h2 className="mt-4 mb-4"> Update Rental List</h2>

                            <Form onSubmit={handleSubmit} className='mb-4'>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                {/* <FormGroup>
                                    <Label for="carId">Car ID</Label>
                                    <Input
                                        type="number"
                                        name="carId"
                                        id="carId"
                                        value={formData.carId}
                                        onChange={handleChange}
                                    />
                                </FormGroup> */}
                                <FormGroup>
                                    <Label for="phoneNumber">Phone Number</Label>
                                    <Input
                                        type="text"
                                        name="phoneNumber"
                                        id="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="cnic">CNIC Number</Label>
                                    <Input
                                        type="text"
                                        name="cnic"
                                        id="cnic"
                                        value={formData.cnic}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="rentDate">Rent Date</Label>
                                    <Input
                                        type="date"
                                        name="rentDate"
                                        id="rentDate"
                                        value={formData.rentDate}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="returnDate">Return Date</Label>
                                    <Input
                                        type="date"
                                        name="returnDate"
                                        id="returnDate"
                                        value={formData.returnDate}
                                        onChange={handleChange}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="status">Status</Label>
                                    <Input
                                        type="select"
                                        name="status"
                                        id="status"
                                        value={formData.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Available">Available</option>
                                        <option value="OnRent">On Rent</option>
                                        {/* Add other status options as needed */}
                                    </Input>
                                </FormGroup>
                                <Button type="submit">Update Rental</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section >
        </Helmet >
    );
};

export default UpdateRentalForm;












// import React, { useState } from 'react';
// import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
// import axios from 'axios';
//  import { useParams } from 'react-router-dom';

// const UpdateRentalForm = ({ rental  }) => {
//      const { id } = useParams();

//     const [formData, setFormData] = useState({
//         name: rental.name,
//         carId: rental.carId,
//         phoneNumber: rental.phoneNumber,
//         rentDate: rental.rentDate,
//         returnDate: rental.returnDate,
//         status: rental.status
//     });

//     const handleChange = e => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async e => {
//         e.preventDefault();
//         try {
//             const response = await axios.put(`http://localhost:5151/api/Rentals/Update/${id}`, formData);
//             if (response.status !== 200) {
//                 throw new Error('Failed to update rental');
//             }
//             // Handle success (e.g., show a success message)
//         } catch (error) {
//             // Handle error (e.g., show an error message)
//             console.error('Error updating rental:', error.message);
//         }
//     };


//     return (
//         <Container>
//             <Row>
//                 <Col md={{ size: 6, offset: 3 }}>
//                     <Form onSubmit={handleSubmit}>
//                         <FormGroup>
//                             <Label for="name">Name</Label>
//                             <Input
//                                 type="text"
//                                 name="name"
//                                 id="name"
//                                 value={formData.name}
//                                 onChange={handleChange}
//                             />
//                         </FormGroup>
//                         <FormGroup>
//                             <Label for="carId">Car ID</Label>
//                             <Input
//                                 type="number"
//                                 name="carId"
//                                 id="carId"
//                                 value={formData.carId}
//                                 onChange={handleChange}
//                             />
//                         </FormGroup>
//                         <FormGroup>
//                             <Label for="phoneNumber">Phone Number</Label>
//                             <Input
//                                 type="text"
//                                 name="phoneNumber"
//                                 id="phoneNumber"
//                                 value={formData.phoneNumber}
//                                 onChange={handleChange}
//                             />
//                         </FormGroup>
//                         <FormGroup>
//                             <Label for="rentDate">Rent Date</Label>
//                             <Input
//                                 type="date"
//                                 name="rentDate"
//                                 id="rentDate"
//                                 value={formData.rentDate}
//                                 onChange={handleChange}
//                             />
//                         </FormGroup>
//                         <FormGroup>
//                             <Label for="returnDate">Return Date</Label>
//                             <Input
//                                 type="date"
//                                 name="returnDate"
//                                 id="returnDate"
//                                 value={formData.returnDate}
//                                 onChange={handleChange}
//                             />
//                         </FormGroup>
//                         <FormGroup>
//                             <Label for="status">Status</Label>
//                             <Input
//                                 type="select"
//                                 name="status"
//                                 id="status"
//                                 value={formData.status}
//                                 onChange={handleChange}
//                             >
//                                 <option value="Available">Available</option>
//                                 <option value="OnRent">On Rent</option>
//                                 {/* Add other status options as needed */}
//                             </Input>
//                         </FormGroup>
//                         <Button type="submit">Update Rental</Button>
//                     </Form>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default UpdateRentalForm;
