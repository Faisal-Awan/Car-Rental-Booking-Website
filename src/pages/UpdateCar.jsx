import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input, Container } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../config/config';
// import useFetch from '../hooks/useFetch';



const UpdateCar = () => {

    const [carData, setCarData] = useState(null);
    const [formData, setFormData] = useState({
        carName: '',
        carNumber: '',
        modelYear: 0,
        dailyPrice: 0,
        description: '',
        isActive: true,
        isDelete: false,
        status: ''
    });

    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        debugger
        fetch(`${BASE_URL}/Cars/${id}`)
            .then(response => response.json())
            .then(data => {
                setCarData(data);
                setFormData(data);
            })
            .catch(error => console.error('Error fetching car:', error));
    }, [id]);

    const handleChange = e => {
        const { name, value, type, checked } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleSubmit = async e => {
        debugger

        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/Cars/edit/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Failed to edit car');
            }
            alert('Car edited successfully');
            navigate('/carList');

        } catch (error) {
            console.error('Error editing car:', error.message);
        }
    };

    if (!carData) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <h2 className='mt-4'>Edit Car</h2 >
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="carName">Car Name</Label>
                    <Input type="text" name="carName" id="carName" value={formData.carName} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="carNumber">Car Number</Label>
                    <Input type="text" name="carNumber" id="carNumber" value={formData.carNumber} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="modelYear">Model Year</Label>
                    <Input type="number" name="modelYear" id="modelYear" value={formData.modelYear} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="dailyPrice">Daily Price</Label>
                    <Input type="number" name="dailyPrice" id="dailyPrice" value={formData.dailyPrice} onChange={handleChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Description</Label>
                    <Input type="textarea" name="description" id="description" value={formData.description} onChange={handleChange} />
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name="isActive" checked={formData.isActive} onChange={handleChange} />
                        Active
                    </Label>
                </FormGroup>
                <FormGroup check>
                    <Label check>
                        <Input type="checkbox" name="isDelete" checked={formData.isDelete} onChange={handleChange} />
                        Delete
                    </Label>
                </FormGroup>
                <Button type="submit" color="primary" className='mb-4'>Submit</Button>
            </Form>
        </Container>
    );
};

export default UpdateCar;
