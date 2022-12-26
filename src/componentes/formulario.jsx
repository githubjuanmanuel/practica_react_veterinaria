import {useState, useEffect} from "react";
import Paciente from "./paciente";
import Error from "./Error";

function Formulario({pacientes, setPacientes, paciente, setPaciente}) {
  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email,setEmail ] = useState('')
  const [fecha, setFecha ]= useState('')
  const [sintomas, setSintomas] = useState('')

  const[error,setError]= useState(false)
  useEffect(()=>{
    if (Object.keys(paciente).length > 0){
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
    
  }, [paciente]);

  const generarId = () => {
    const random= Math.random().toString(36);
    const fecha = Date.now().toString(36);

    return random + fecha
  }

  const handleSumit = (e) => {
    e.preventDefault();
    //Validación del formulario
    if ([nombre, propietario, email, fecha, sintomas].includes('') ){
      setError(true)
      return;
    } 
    setError(false)

    const objetoPaciente = {
      nombre, propietario, email, fecha, sintomas
    }
    if (paciente.id){
      //Editando el registro
      objetoPaciente.id=paciente.id
      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === paciente.id ? objetoPaciente : pacienteState)
      setPacientes(pacientesActualizados)
      setPaciente({})
    }
    else{
      //Nuevo registro
      objetoPaciente.id=generarId()
      setPacientes([...pacientes, objetoPaciente])
    }
    
    
    //reinicio del formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5" >
      <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Añade pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>
      <form 
      onSubmit={handleSumit}
      className="bg-slate-300 shadow-md rounded-xl py-10 px-5 mb-10">
        {error && <Error mensaje='Todos los campos son obligatorios' />}
        <div className="mb-5">
          <label
            htmlFor="Mascota"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre de la mascota
          </label>
          <input
            id="Mascota"
            type="text"
            placeholder="Nombre de la mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange={ (e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="Propietario"
            className="block text-gray-700 uppercase font-bold"
          >
            Nombre del propietario
          </label>
          <input
            id="Propietario"
            type="text"
            placeholder="Nombre de propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange={ (e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="Email"
            className="block text-gray-700 uppercase font-bold"
          >
            Email
          </label>
          <input
            id="Email"
            type="email"
            placeholder="Ingresa un email de contacto"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange={ (e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="Alta"
            className="block text-gray-700 uppercase font-bold"
          >
            Alta
          </label>
          <input
            id="Alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={ (e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="Sintomas"
            className="block text-gray-700 uppercase font-bold">
            Sintomas
          </label>
          <textarea
            id="Sintomas"
            type="text"
            placeholder="Describe los sintomas del paciente"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={sintomas}
            onChange={ (e) => setSintomas(e.target.value)}
          />
        </div>
        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all rounded-md"
          value={paciente.id ? 'Editar paciente' : 'Agregar paciente'}
        />
      </form>
    </div>
  );
}

export default Formulario;
