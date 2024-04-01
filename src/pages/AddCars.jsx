import React, { useState } from 'react';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Helmet from '../components/Helmet';
import CommonSection from '../components/CommonSection';


const AddCarForm = ({ onAddCar }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        // carId: '',
        carName: '',
        carNumber: '',
        modelYear: '',
        dailyPrice: '',
        description: '',
        isActive: true,
        isDelete: false,
        status: 'Available' // Assuming 'Available' is the default status
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5151/api/Cars/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to add car');
            }
            alert('Car added successfully');
            // Reset the form after successful submission
            setFormData({
                // carId: '',
                carName: '',
                modelYear: '',
                dailyPrice: '',
                description: '',
                isActive: true,
                isDelete: false,
                status: 'Available'
            });
            // Navigate to /car-listing after 3 seconds
            setTimeout(() => {
                navigate('/car-listing');
            }, 3000);
            // Notify parent component about the new car addition
            onAddCar();
        } catch (error) {
            console.error('Error adding car:', error.message);
        }
    };

    return (
        <Helmet title="Car-Listing">
            <section className="pt-0">
                <CommonSection title="Car Listing" />
            </section>
            <section className="pt-0">
                <Container>
                    <Row className="justify-content-center , mb-4 ,mt-8">
                        <Col md="8">
                            <h2 className=" mt-4 ,mb-4">Add Car</h2>
                            <Form onSubmit={handleSubmit}>
                                {/* <FormGroup>
                                    <Label for="carId">Car Id</Label>
                                    <Input type="text" name="carId" id="carId" value={formData.carId} onChange={handleChange} required />
                                </FormGroup> */}
                                <FormGroup>
                                    <Label for="carName">Car Name</Label>
                                    <Input type="text" name="carName" id="carName" value={formData.carName} onChange={handleChange} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="carNumber">Car Number</Label>
                                    <Input type="text" name="carNumber" id="carNumber" value={formData.carNumber} onChange={handleChange} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="modelYear">Model Year</Label>
                                    <Input type="text" name="modelYear" id="modelYear" value={formData.modelYear} onChange={handleChange} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="dailyPrice">Daily Price</Label>
                                    <Input type="number" name="dailyPrice" id="dailyPrice" value={formData.dailyPrice} onChange={handleChange} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="description">Description</Label>
                                    <Input type="textarea" name="description" id="description" value={formData.description} onChange={handleChange} required />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="status">Status</Label>
                                    <Input type="select" name="status" id="status" value={formData.status} onChange={handleChange}>
                                        <option value="Available">Available</option>
                                        <option value="OnRent">On Rent</option>
                                        {/* Add other status options as needed */}
                                    </Input>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />{' '}
                                        Active
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" name="isDelete" checked={formData.isDelete} onChange={handleChange} />{' '}
                                        Delete
                                    </Label>
                                </FormGroup>

                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <Button type="submit" color="primary">Submit</Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default AddCarForm;
