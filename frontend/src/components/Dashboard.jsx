import { useState, useEffect, useRef } from 'react';
import QRCode from "react-qr-code";
import {
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBCard,
    MDBCardText,
    MDBCardBody,
    MDBCardImage,
    MDBBtn,
    MDBTypography
} from 'mdb-react-ui-kit';
import { useParams, useNavigate } from 'react-router-dom';

export default function Dashboard() {

    const username = localStorage.getItem('username');
    const email = localStorage.getItem('email');
    const token = localStorage.getItem('jwtToken');
    const picture = localStorage.getItem('picture');
    const navigate = useNavigate();
    const param = useParams();
    const profilePicRef = useRef();

    const profilePic = `data:image/jpg;base64,${picture}`;

    const fetchData = async () => {
        try {
            const response = await fetch(
                `http://localhost:8080/dashboard/?id=${param.userId}`,
                {
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            if (response.status === 401) {
                navigate('*');
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleEditButton = async () => {
        console.log("clicked")
        try {
            const response = await fetch(
                `http://localhost:8080/dashboard/edit-user/?id=${param.userId}`,
                {
                    method: "GET",
                    mode: "cors",
                    headers: {
                        //TODO at the end we need this
                        // "X-XSRF-TOKEN": csrfToken,
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
    
            if (response.status == 401) {
                navigate("*");
            } else {
                navigate("/dashboard/edit-user/:userId")
            }
        } catch (error) {
            console.log(error);
        }
    };
    

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="gradient-custom-2" >
            <MDBContainer className="py-5 h-100">
                <MDBRow className="justify-content-center align-items-center h-100">
                    <MDBCol lg="9" xl="7">
                        <MDBCard>
                            <div
                                className="rounded-top text-white d-flex flex-row"
                                style={{ backgroundColor: '#000', height: '200px' }}
                            >
                                <div
                                    className="ms-4 mt-5 d-flex flex-column"
                                    style={{ width: '150px' }}
                                >
                                    <MDBCardImage
                                        src={profilePic}
                                        alt="Profile"
                                        className="mt-4 mb-2 img-thumbnail"
                                        fluid
                                        style={{ width: '150px', zIndex: '1' }}
                                        ref={profilePicRef}
                                    />
                                </div>
                                <div className="ms-3" style={{ marginTop: '130px' }}>
                                    <MDBTypography tag="h5">
                                        Hi {username}, welcome!
                                    </MDBTypography>
                                    <MDBCardText>{email}</MDBCardText>
                                </div>
                            </div>
                            <div
                                className="p-4 text-black"
                                style={{ backgroundColor: '#f8f9fa' }}
                            >
                                <div className="d-flex justify-content-end text-center py-1">
                                <MDBBtn
                                        color="dark"
                                        style={{ height: '36px', overflow: 'visible' }}
                                        onClick={(e) => handleEditButton(e)}
                                    >
                                        Edit profile
                                    </MDBBtn>
                                </div>
                            </div>
                            <MDBCardBody className="text-black p-4">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <MDBCardText className="lead fw-normal mb-0">
                                        Recent Contacts
                                    </MDBCardText>
                                    <MDBCardText className="mb-0">
                                        <button
                                            className="btn btn-primary"
                                            style={{ backgroundColor: '#333' }}
                                            onClick={()=> {
                                                navigate("/dashboard/contacts")
                                            }}
                                        >
                                            View All
                                        </button>
                                    </MDBCardText>
                                </div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <MDBCardText className="lead fw-normal mb-0">
                                        Analytics
                                    </MDBCardText>
                                    <MDBCardText className="mb-0">
                                        <button
                                            className="btn btn-primary"
                                            style={{ backgroundColor: '#333' }}
                                        >
                                            View Details
                                        </button>
                                    </MDBCardText>
                                </div>
                                <MDBRow>
                                    <MDBCol className="mb-2">
                                        <QRCode
                                            style={{ height: 100, width: 100 }}
                                            value={`http://localhost:5173/api/v1/business-card/${username}`}
                                        />
                                    </MDBCol>
                                </MDBRow>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </div>
    );
}
