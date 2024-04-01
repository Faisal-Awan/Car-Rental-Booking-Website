import React, { useState, useEffect } from 'react';
import CommonSection from '../components/CommonSection';
import { Container, Row, Col, Form, FormGroup, Input } from 'reactstrap';
import Helmet from '../components/Helmet';
import { useNavigate } from 'react-router-dom';

import '../styles/sign-in.css';
import { useParams } from 'react-router-dom';

const PersonDetail = () => {

    const navigate = useNavigate();

    // debugger
    // const history = useHistory(); // Initialize useHistory hook
    // const location = useLocation(); // Initialize useLocation hook
    const  {carId } = useParams();
    console.log(carId);

    const [formData, setFormData] = useState({
        name: '',
        phoneNumber: '',
        cnic: '',
        rentDate: '',
        returnDate: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    useEffect(() => {
        // Set rentDate to the current date
        const currentDate = new Date().toISOString().split('T')[0];
        setFormData(prevState => ({
            ...prevState,
            rentDate: currentDate
        }));
    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault();

debugger
        const phoneNumberPattern = /^\+92312\s\d{7}$/;
        const cnicPattern = /^\d{5}-\d{7}-\d{1}$/;
        if (!phoneNumberPattern.test(formData.phoneNumber)) {
            alert('Invalid phone number. Please enter a valid phone number starting with +92312 and followed by 7 digits.');
            return;
        }
        console.log(JSON.stringify(formData));
        if (!cnicPattern.test(formData.cnic)) {
            alert('Invalid CNIC number. Please enter a valid CNIC number in the format xxxxx-xxxxxxx-x.');
            return;
        }

debugger
        try {
            const response = await fetch('http://localhost:5151/api/Rentals/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Name: formData.name,
                    PhoneNumber: formData.phoneNumber,
                    CNIC: formData.cnic,
                    RentDate: formData.rentDate,
                    ReturnDate: formData.returnDate,
                    Description: formData.description,
                    CarId: carId,
                    Status: "OnRent"
                })
            });
debugger
            if (!response.ok) {
                throw new Error('Failed to register rental');
            }

            // Handle successful registration
            console.log('Rental registered successfully');
            alert('Rental registered successfully');

            // Wait for 3 seconds and then navigate to /car-listing
            setTimeout(() => {
                navigate('/car-listing');
            }, 2000);
        } catch (error) {
            console.error('Error registering rental:', error.message);
        }
    };


    // const handleSubmit = async (e) => {
    //     e.preventDefault();

    //     try {

    //         const response = await fetch('http://localhost:5151/api/Rentals/Register', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({
    //                 Name: formData.name,
    //                 PhoneNumber: formData.phoneNumber,
    //                 RentDate: formData.rentDate,
    //                 ReturnDate: formData.returnDate,
    //                 CarId: carId,
    //                 Status:"OnRent"
    //             })
    //         });
    //         if (!response.ok) {
    //             throw new Error('Failed to register rental');
    //         }

    //         // Handle successful registration
    //         console.log('Rental registered successfully');
    //     } catch (error) {
    //         console.error('Error registering rental:', error.message);
    //     }
    // };

    return (
        <Helmet title="Login">
            <section className="p-0">
                <CommonSection title="Rental Detail" />
            </section>
            <section>
                <Container>
                    <Row>
                        <Col lg="4" md="6" sm="8" xs="10" className="m-auto">
                            <h4 className=" d-flex align-items-center gap-2 justify-content-center mb-5">
                                <i className="ri-key-2-line"></i> Rent Out detail
                            </h4>
                            <Form onSubmit={handleSubmit}>
                                <FormGroup className="login__form d-flex align-items-center gap-4 mb-4">
                                    <span>
                                        <i className="ri-user-line"></i>
                                    </span>
                                    <input type="text" name="name" placeholder=" Name" value={formData.name} onChange={handleChange} required />
                                </FormGroup>
                                <FormGroup className="login__form d-flex align-items-center gap-4 mb-4">
                                    <span>
                                        <i className="ri-phone-line"></i>
                                    </span>
                                    <input type="text" name="phoneNumber" placeholder="Phone Number" value={formData.phoneNumber} onChange={handleChange} required />
                                </FormGroup>
                                <FormGroup className="login__form d-flex align-items-center gap-4 mb-4">
                                    <span>
                                        CNIC
                                    </span>
                                    <input type="text" name="cnic" placeholder="CNIC Number" value={formData.cnic} onChange={handleChange} required />
                                </FormGroup>
                                <FormGroup className="login__form d-flex align-items-center gap-4 mb-4">
                                    <span>
                                        From
                                    </span>
                                    <Input type="date" name="rentDate" placeholder="Journey Data" value={formData.rentDate} onChange={handleChange} required />
                                </FormGroup>
                                <FormGroup className="login__form d-flex align-items-center gap-4 mb-4">
                                    <span>
                                        To
                                    </span>
                                    <Input type="date" name="returnDate" placeholder="Journey Data" value={formData.returnDate} onChange={handleChange} />
                                </FormGroup>
                                <FormGroup className="login__form d-flex align-items-center gap-4 mb-4">
                                    <textarea
                                        name="description"
                                        placeholder="Description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        style={{
                                            width: '100%',
                                            border: 'none', 
                                            outline: 'none', 
                                            resize: 'none', 
                                            
                                        }}
                                    ></textarea>
                                </FormGroup>

                                <button className="login__btn d-flex align-items-center gap-4 mb-4" type="submit">
                                    Continue
                                </button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    );
};

export default PersonDetail;

