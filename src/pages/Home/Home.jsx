import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Spinner, Card } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import axiosWrapper from '../../utils/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [uniqueUserIds, setUniqueUserIds] = useState(new Set());
    const navigate = useNavigate();

    const getAllUsers = async () => {
        try {
            setLoading(true);
            const response = await axiosWrapper('get', `${import.meta.env.VITE_API_URL}/user?page=${Number(page)}&pageSize=${Number(20)}`);

            const uniqueUsers = response.users.filter((user) => !uniqueUserIds.has(user._id));

            setUsers((prevUsers) => [...prevUsers, ...uniqueUsers]);
            setPage((prevPage) => prevPage + 1);

            const newIds = response.users.map((user) => user._id);
            setUniqueUserIds((prevIds) => new Set([...prevIds, ...newIds]));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const { scrollTop, clientHeight, scrollHeight } = document.documentElement;

            if (scrollTop + clientHeight >= scrollHeight - 10 && !loading) {
                getAllUsers();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [page, loading, users]);

    const handleUpdate = (userId) => {
        navigate(`/user/${userId}`);
    };

    const handleDelete = async (userId) => {
        await axiosWrapper('delete', `${import.meta.env.VITE_API_URL}/user/${userId}`);
        await getAllUsers(); // Fetch the updated user list after deletion
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>Users | Dashboard</title>
            </Helmet>
            <Row className="mb-4">
                <Col>
                    <h2 className="text-center">User List</h2>
                </Col>
                <Col className="text-center">
                    <Button variant="success" onClick={() => navigate('/add-user')}>
                        Add User
                    </Button>
                </Col>
            </Row>
            <Row>
                {users.map((user, index) => (
                    <Col key={index} xs={12} md={4} className="mb-3">
                        <Card>
                            <Card.Body>
                                <Card.Title>{user.name}</Card.Title>
                                <Card.Text>
                                    <strong>Email:</strong> {user.email}
                                </Card.Text>
                                <div className="d-flex align-items-center justify-content-between">
                                    <Button variant="primary" onClick={() => handleUpdate(user._id)}>
                                        View
                                    </Button>
                                    <Button className="ml-2" variant="danger" onClick={() => handleDelete(user._id)} className="ml-2">
                                        Delete
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

            {loading && (
                <div className="text-center mt-3">
                    <Spinner animation="border" role="status">
                        <span className="sr-only">Loading...</span>
                    </Spinner>
                </div>
            )}
        </React.Fragment>
    );
};

export default Home;
