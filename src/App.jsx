import { useState, useEffect } from 'react'
import { Form, FormGroup, Label, Input, Button, FormFeedback, ListGroup, ListGroupItem, Container, Row, Col, Alert } from 'reactstrap'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [confimaciones, setconfimaciones] = useState([])
  const [nuevoId, setNuevoId] = useState('')
  const [nuevoRut, setNuevoRut] = useState('')
  const [nuevoNombre, setNuevoNombre] = useState('')
  const [tipoLicencia, setTipoLicencia] = useState('')
  const [editandoSolicitud, setEditandoconfirmacion] = useState(null)
  const [mensaje, setMensaje] = useState(null)

  const handleNuevoId = (e) => setNuevoId(e.target.value)
  const handleNuevoRut = (e) => setNuevoRut(e.target.value)
  const handleNuevoNombre = (e) => setNuevoNombre(e.target.value)
  const handleTipoLicencia = (e) => setTipoLicencia(e.target.value)

  const mostrarMensaje = (contenido) => {
    setMensaje({contenido});
  }

  const handleAgregarSolicitud = () => {
    const nuevaConfirmacion = {
      id: nuevoId,
      rut: nuevoRut,
      nombre: nuevoNombre,
      licencia: tipoLicencia
    }

    setconfimaciones(prev => {
      const nuevoArreglo = [...prev, nuevaConfirmacion]
      localStorage.setItem("items", JSON.stringify(nuevoArreglo))
      mostrarMensaje('Solicitud agregada con éxito.')
      return nuevoArreglo
    })

    setNuevoId('')
    setNuevoRut('')
    setNuevoNombre('')
    setTipoLicencia('')
  }

  const handleEliminarConfirmacion = (id) => {
    setconfimaciones(prev => {
      const resultadosEliminados = prev.filter(objeto => objeto.id !== id);
      localStorage.setItem("items", JSON.stringify(resultadosEliminados));
      mostrarMensaje('Solicitud eliminada con éxito.');
      return resultadosEliminados;
    });
  };

  const handleEditarConfirmacion = (solicitud) => {
    setEditandoconfirmacion(solicitud)
    setNuevoId(solicitud.id)
    setNuevoRut(solicitud.rut)
    setNuevoNombre(solicitud.nombre)
    setTipoLicencia(solicitud.licencia)
  }

  const handleGuardarEdicion = () => {
    setconfimaciones(prev => {
      const confimacionesActualizadas = prev.map(s =>
        s.id === editandoSolicitud.id ? { ...s, id: nuevoId, rut: nuevoRut, nombre: nuevoNombre, licencia: tipoLicencia } : s
      )
      localStorage.setItem("items", JSON.stringify(confimacionesActualizadas))
      mostrarMensaje('Edición guardada con éxito.')
      return confimacionesActualizadas
    })

    setEditandoconfirmacion(null);
    setId('')
    setNuevoRut('')
    setNuevoNombre('')
    setTipoLicencia('')
  };

  const handleCancelarEdicion = () => {
    setEditandoconfirmacion(null);
    setId('')
    setNuevoRut('')
    setNuevoNombre('')
    setTipoLicencia('')
  };

  useEffect(() => {
    const confimacionesAlmacenadas = JSON.parse(localStorage.getItem("items") || "[]");
    setconfimaciones(confimacionesAlmacenadas);
    console.log("Solicitudes cargadas desde localStorage:", confimacionesAlmacenadas);
  }, []);

  return (
    <div className='formulario'>
      <Container className="centered-container">
      <Row className="justify-content-center">
        <Col md="12">
        <h3>CONFIRMAR HORA PARA LICENCIA DE CONDUCIR</h3>
          <Form>
            <FormGroup>
              <Label for="id">Numero de confirmación</Label>
              <Input
                type="number"
                name="id"
                id="id"
                placeholder="Ingrese el numero proporsionado para confirmar la hora"
                value={nuevoId}
                onChange={handleNuevoId}
                invalid={!nuevoId && (editandoSolicitud === null)}
              />
              {!nuevoId && (editandoSolicitud === null) && <FormFeedback>Este campo es obligatorio.</FormFeedback>}
            </FormGroup>

            <FormGroup>
              <Label for="rut">RUT del solicitante</Label>
              <Input
                type="text"
                name="rut"
                id="rut"
                placeholder="Ingrese su RUT"
                value={nuevoRut}
                onChange={handleNuevoRut}
                invalid={!nuevoRut && (editandoSolicitud === null)}
              />
              {!nuevoRut && (editandoSolicitud === null) && <FormFeedback>Este campo es obligatorio.</FormFeedback>}
            </FormGroup>

            <FormGroup>
              <Label for="nombre">Nombre del Solicitante</Label>
              <Input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Ingrese su nombre completo"
                value={nuevoNombre}
                onChange={handleNuevoNombre}
                invalid={!nuevoNombre && (editandoSolicitud === null)}
              />
              {!nuevoNombre && (editandoSolicitud === null) && <FormFeedback>Este campo es obligatorio.</FormFeedback>}
            </FormGroup>

            <FormGroup>
              <Label>Tipo de Licencia</Label>
              <FormGroup check>
                  <Input
                    type="radio"
                    name="licencia"
                    value="Auto"
                    checked={tipoLicencia === 'Auto'}
                    onChange={handleTipoLicencia}
                  />
                  {' '} 
                <Label check>
                  Licencia para auto
                </Label>
              </FormGroup>
              <FormGroup check>
                  <Input
                    type="radio"
                    name="licencia"
                    value="Moto"
                    checked={tipoLicencia === 'Moto'}
                    onChange={handleTipoLicencia}
                  />
                  {' '} 
                <Label check>
                  Licencia para moto
                </Label>
              </FormGroup>
              <FormGroup check>
                  <Input
                    type="radio"
                    name="licencia"
                    value="Camión"
                    checked={tipoLicencia === 'Camión'}
                    onChange={handleTipoLicencia}
                  />
                  {' '} 
                <Label check>
                  Licencia de Camión
                </Label>
              </FormGroup>
              {!tipoLicencia && (editandoSolicitud === null) && <FormFeedback>Seleccione un tipo de licencia.</FormFeedback>}
            </FormGroup>

            <Button
              color="primary"
              onClick={editandoSolicitud ? handleGuardarEdicion : handleAgregarSolicitud}
            >
              {editandoSolicitud ? 'Guardar Cambios' : 'confirmar'}
            </Button>
            {editandoSolicitud && <Button color="secondary" onClick={handleCancelarEdicion}>Cancelar</Button>}
          </Form>
          {mensaje && <Alert id='alerta'>{mensaje.contenido}</Alert>}
        </Col>
      </Row>

      <ListGroup>
        {confimaciones.map(s => (
          <ListGroupItem key={s.id}>
            {s.id} - {s.rut} - {s.nombre} - {s.licencia}
            <Button className='boton' color="warning" onClick={() => handleEditarConfirmacion(s)}>Editar</Button>
            <Button className='boton' color="danger" onClick={() => handleEliminarConfirmacion(s.id)}>Eliminar</Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>           
    </div>
  );
}

export default App;
