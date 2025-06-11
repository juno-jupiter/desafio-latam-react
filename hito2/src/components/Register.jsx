import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Col from "react-bootstrap/Col";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const validateEmail = (formState) => {
    if (!formState.inputs.email.value) return "Este campo no puede quedar vacío.";
    return "";
}

const validatePassword1 = (formState) => {
    if (!formState.inputs.password1.value) return "Este campo no puede quedar vacío.";
    if (formState.inputs.password1.value.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
    return "";
}

const validatePassword2 = (formState) => {
    if (!formState.inputs.password2.value) return "Este campo no puede quedar vacío.";
    if (formState.inputs.password1.value != formState.inputs.password2.value) return "Las contraseñas no coinciden.";
    return "";
}

const defaultForm = {
    validated: false,
    isValid: false,
    inputs : {
        email : {value: "", error: "", validation: validateEmail},
        password1 : {value: "", error: "", validation: validatePassword1},
        password2 : {value: "", error: "", validation: validatePassword2},
    }
};

const defaultModal = {show: false, title: "", text: "", button: "dark", bg: "dark"};

const Register = () => {
    const [formState, setFormState] = useState(defaultForm);
    const [modalState, setModalState] = useState(defaultModal);

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
            handleShow({title: "Registro exitoso!", text: "Los datos ingresados son correctos."});
        } else {
            handleShow({title: "Error", text: "Los datos ingresados son incorrectos :(", bg: "danger", button: "danger"});
        }
        setFormState(newFormState);
    };

    const handleShow = (modalProps) => setModalState({...defaultModal, ...modalProps, show: true});
    const handleClose = () => setModalState(defaultModal);

    return <Form className="m-3" noValidate onSubmit={handleSubmit}>
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
        <Form.Group className="mb-3" controlId="register.Password1Input" as={Col}>
            <Form.Label className="fw-bold">Contraseña*</Form.Label>
            <Form.Control
                type="password" required
                value={formState.inputs.password1.value}
                onChange={(e) => onValueChange("password1", e)}
                isValid={(!formState.inputs.password1.error) && formState.validated}
                isInvalid={formState.inputs.password1.error && formState.validated}
            />
            <Form.Control.Feedback type="invalid">{formState.inputs.password1.error}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3" controlId="register.Password2Input" as={Col}>
            <Form.Label className="fw-bold">Confirmar contraseña*</Form.Label>
            <Form.Control
                type="password" required
                value={formState.inputs.password2.value}
                onChange={(e) => onValueChange("password2", e)}
                isValid={(!formState.inputs.password2.error) && formState.validated}
                isInvalid={formState.inputs.password2.error && formState.validated}
            />
            <Form.Control.Feedback type="invalid">{formState.inputs.password2.error}</Form.Control.Feedback>
        </Form.Group>
        <Col className="text-center">
            <Button variant="dark" type="submit">    Registrarse    </Button>
        </Col>
        <Modal show={modalState.show} onHide={handleClose}>
            <Modal.Header closeButton className={"text-white bg-"+modalState.bg}>
                <Modal.Title>{modalState.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalState.text}</Modal.Body>
            <Modal.Footer>
                <Button variant={modalState.button} onClick={handleClose}>    OK    </Button>
            </Modal.Footer>
        </Modal>
    </Form>;
}

export default Register;