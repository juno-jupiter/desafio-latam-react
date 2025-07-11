import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const validateEmail = (formState) => {
    if (!formState.inputs.email.value) return "Este campo no puede quedar vacío.";
    return "";
}

const validatePassword = (formState) => {
    if (!formState.inputs.password.value) return "Este campo no puede quedar vacío.";
    if (formState.inputs.password.value.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    return "";
}

const defaultForm = {
    validated: false,
    isValid: false,
    inputs : {
        email : {value: "", error: "", validation: validateEmail},
        password : {value: "", error: "", validation: validatePassword},
    }
};

const defaultModal = {show: false, title: "", text: "", button: "dark", bg: "dark", ok: false};

const Login = () => {
    const [formState, setFormState] = useState(defaultForm);
    const [modalState, setModalState] = useState(defaultModal);
    const {token, user, actions} = useContext(UserContext);

    const onValueChange = (inputName, e) => {
        setFormState({
            ...formState,
            inputs: {...formState.inputs, [inputName]: {...formState.inputs[inputName], value: e.target.value}}
        });
    }

    const handleSubmit = (event) => {
        const newFormState = {...formState, validated: true};
        event.preventDefault();
        event.stopPropagation();
        newFormState.isValid = true;
        for (const [key, value] of Object.entries(formState.inputs)) {
            newFormState.inputs[key].error = value?.validation ? value.validation(formState) : "";
            if (newFormState.inputs[key].error) newFormState.isValid = false;
        }
        if (newFormState.isValid) {
            handleShow({title: "Login exitoso!", text: "Los datos ingresados son correctos.", ok: true});
        } else {
            handleShow({title: "Error", text: "Los datos ingresados son incorrectos :(", bg: "danger", button: "danger", ok: false});
        }
        setFormState(newFormState);
    };

    const handleShow = (modalProps) => setModalState({...defaultModal, ...modalProps, show: true});
    const handleClose = () => {
        setModalState(defaultModal);
        if (modalState.ok) actions.login(formState.inputs.email.value, formState.inputs.password.value);
    }

    return <main className="p-3">
        <Container>
            <h1>Login</h1>
            <Form className="m-3" noValidate onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="register.EmailInput" as={Col}>
                    <Form.Label className="fw-bold">Correo*</Form.Label>
                    <Form.Control
                        type="email" required
                        placeholder="nombre@ejemplo.com"
                        value={formState.inputs.email.value}
                        onChange={(e) => onValueChange("email", e)}
                        isValid={(!formState.inputs.email.error) && formState.validated}
                        isInvalid={formState.inputs.email.error && formState.validated}
                    />
                    <Form.Control.Feedback type="invalid">{formState.inputs.email.error}</Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="register.PasswordInput" as={Col}>
                    <Form.Label className="fw-bold">Contraseña*</Form.Label>
                    <Form.Control
                        type="password" required
                        value={formState.inputs.password.value}
                        onChange={(e) => onValueChange("password", e)}
                        isValid={(!formState.inputs.password.error) && formState.validated}
                        isInvalid={formState.inputs.password.error && formState.validated}
                    />
                    <Form.Control.Feedback type="invalid">{formState.inputs.password.error}</Form.Control.Feedback>
                </Form.Group>
                <Col className="text-center">
                    <Button variant="dark" type="submit">    Enviar    </Button>
                </Col>
                <Modal show={modalState.show} onHide={handleClose}>
                    <Modal.Header closeButton className={"text-white bg-"+modalState.bg}>
                        <Modal.Title>{modalState.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modalState.text}</Modal.Body>
                    <Modal.Footer>
                        <Button variant={modalState.button} onClick={handleClose}>
                            &nbsp;&nbsp;&nbsp;&nbsp;OK&nbsp;&nbsp;&nbsp;&nbsp;
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Form>
        </Container>
    </main>;
}

export default Login;