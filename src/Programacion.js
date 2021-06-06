import {useState,useEffect} from 'react';
import axios from 'axios';

const Programacion =()=>{
    const [respuesta, setRespuesta] = useState([])

    useEffect(() => {
     
        axios.get("http://areco.gob.ar:9529/api/programacion/all")
        .then(res=>{
              setRespuesta(res.data.data);
             
            })
           
        },[setRespuesta] )

        useEffect(() => {
     
            axios.get("http://areco.gob.ar:9529/api/programacion/all")
            .then(res=>{
                  setRespuesta(res.data.data);
                 
                })
               
            },[setRespuesta] )

            return respuesta
}
export default  Programacion