import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Spinner } from 'react-bootstrap';
import MedicoSidebar from '../../components/MedicoSidebar';
import { FaCalendarCheck, FaUsers, FaFilePrescription } from "react-icons/fa";
import { Link } from 'react-router-dom';
import '../../styles/MedicoDashboard.css';

const MedicoDashboard = () => {

    const [proximasCitas, setProximasCitas] = useState([]);
    const [pacientesRecientes, setPacientesRecientes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const citasResponse = await fetch('http://localhost/sistema_adfs/api/citas_medico.php');
                const pacientesResponse = await fetch('http://localhost/sistema_adfs/api/pacientes_recientes.php');

                const citasData = await citasResponse.json();
                const pacientesData = await pacientesResponse.json();

                setProximasCitas(citasData);
                setPacientesRecientes(pacientesData);

            } catch (error) {
                console.error("Error cargando datos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);


    return (
        <>
            <MedicoSidebar />
            <Container fluid className="medico-dashboard">
                <Row>
                    <Col>
                        <h2>Dashboard Médico</h2>
                    </Col>
                </Row>

                {loading ? (
                    <div className="text-center"><Spinner animation="border" variant="success" /></div>
                ) : (
                    <Row>
                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title><FaCalendarCheck className="icon" /> Próximas Citas</Card.Title>
                                    <Table striped hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Paciente</th>
                                                <th>Fecha</th>
                                                <th>Hora</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {proximasCitas.map((cita, index) => (
                                                <tr key={index}>
                                                    <td>{cita.paciente}</td>
                                                    <td>{cita.fecha}</td>
                                                    <td>{cita.hora}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                    <Button as={Link} to="/medico/agenda">Ver Agenda Completa</Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title><FaUsers className="icon" /> Pacientes Recientes</Card.Title>
                                    <ul>
                                        {pacientesRecientes.map((paciente, index) => (
                                            <li key={index}>{paciente.nombre} (última cita: {paciente.ultimaCita})</li>
                                        ))}
                                    </ul>
                                    <Button as={Link} to="/medico/pacientes">Ver todos los pacientes</Button>
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col md={4}>
                            <Card>
                                <Card.Body>
                                    <Card.Title><FaFilePrescription className="icon" /> Recetas Médicas</Card.Title>
                                    <p>Genera o consulta recetas médicas para tus pacientes.</p>
                                    <Button as={Link} to="/medico/recetas">Ir a Recetas Médicas</Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Container>
        </>
    );
};

export default MedicoDashboard;