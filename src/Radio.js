import React,{useState,useEffect,useCallback} from 'react';
import './App.css';

import { Col, Container, Row,Button} from 'react-bootstrap';
import PlayPause from  './PlayPause';

import face from './assest/face.png';
import instagram from './assest/instagram.png';
import logo from './assest/Logomuni.png';
import programacion from "./Programacion";
import { Capacitor } from '@capacitor/core';
import { FCM } from '@capacitor-community/fcm';

import {PushNotifications} from '@capacitor/push-notifications'


import { App } from '@capacitor/app';
import { AppLauncher } from '@capacitor/app-launcher';


const URL_HOST='http://areco.gob.ar:9529';
const  Apps=()=> {
  
 var foto='';
  
  const [url,setUrl]=useState(URL_HOST+'/api/programacion/imagen/encomun.jpg');
  const data=programacion()
  
 
 
  
const  launchApp= ()=> {
    if (Capacitor.isNativePlatform()) {
       AppLauncher.canOpenUrl({url: "com.facebook.katana"})
      .then((response)=>{
        console.log("ret",response.value)
        if(response.value){
           AppLauncher.openUrl({url: "fb://page/102966494663307" })
           .then((response)=>{console.log ('Respuesta de URL abierta app:', response.completed);})
          .catch((error)=>{console.log(error)})
        }else{
        AppLauncher.openUrl ({url: 'https://www.facebook.com/pamparadio879fm'})
         .then((response)=>{console.log ('Respuesta de URL abierta web:', response.completed);})
         .catch((error)=>{console.log(error)})
        }
      })
     
     
    } else {
     window.open('https://www.facebook.com/pamparadio879fm', '_blank');
    }
   
 }

 const  launchApp1= async()=> {
  if (Capacitor.isNativePlatform()) {
    AppLauncher.canOpenUrl({url: "com.instagram.android"})
    .then((response)=>{
      console.log("ret",response.value)
      if(response.value){
         AppLauncher.openUrl({url: "instagram://user?username=pamparadio879fm" })
         .then((response)=>{console.log ('Respuesta de URL abierta app:', response.completed);})
        .catch((error)=>{console.log(error)})
      }else{
      AppLauncher.openUrl ({url: 'https://www.instagram.com/pamparadio879fm/'})
       .then((response)=>{console.log ('Respuesta de URL abierta web:', response.completed);})
       .catch((error)=>{console.log(error)})
      }
    })
    
  
  } else {
    
    window.open('https://www.instagram.com/pamparadio879fm/', '_blank');
  }
 
}
  
 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fotos=useCallback(()=>{
      const dia = new Date();
      const hora=((dia.getHours()*60)+dia.getMinutes());
      const nrodia=dia.getDay()
     
     const resultado=data.filter(data=>data.min_inicio <=hora && data.min_fin >= hora &&
        (data.dias.dia0  === nrodia ||
        data.dias.dia1 === nrodia||
        data.dias.dia2 === nrodia||
        data.dias.dia3 ===  nrodia||
        data.dias.dia4 === nrodia||
        data.dias.dia5 === nrodia||
        data.dias.dia6 === nrodia)
      )
     const diaa= resultado.map((data,i)=>{
              switch (dia.getDay()) {
                case data.dias.dia0:return data.imagen;
                case data.dias.dia1:return data.imagen;
                case data.dias.dia2:return data.imagen;
                case data.dias.dia3:return data.imagen;
                case data.dias.dia4:return data.imagen;
                case data.dias.dia5:return data.imagen;
                case data.dias.dia6:return data.imagen;
    
              
                default:
                  return "encomun"
              }
            })
     
     if (diaa[0]===undefined) {
      //setFoto("encomun")
      foto="encomun"
      setUrl(URL_HOST+'/api/programacion/imagen/'+foto+'.jpg')
     }else{
     foto=diaa[0]
     setUrl(URL_HOST+'/api/programacion/imagen/'+foto+'.jpg')
    }
    
    
    })
    useEffect(() => {
      fotos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
    
    const fcm = new FCM();
   useEffect(() => {
      if (Capacitor.isNativePlatform()) {
        PushNotifications.register()
      .then(() => {
        //
        // Subscribe to a specific topic
        // you can use `FCMPlugin` or just `fcm`
       // FCMPlugin
       fcm
          .subscribeTo({ topic: 'radio' })
          .then(() => console.log("estas en Radio Pampa "))
          .catch(() => console.log("err"));
      })
      .catch((err) => alert(JSON.stringify(err)));
      PushNotifications.addListener('registration',
      (token) => {
       
        console.log(token.value);
      }
    ); 
    PushNotifications.addListener('registrationError',
      (error) => {
       // alert('Error on registration: ' + JSON.stringify(error));
      }
    );
    
        App.addListener("backButton", () => {
            
              App.exitApp();
           
        });
      }
    }, [])
  
 

    const onchangeGrilla=()=>{
      console.log("Grilla")
      setUrl(URL_HOST+'/api/programacion/imagen/Grilla.jpg')
    }
  
    const onchangeFoto=()=>{
     fotos();
     setUrl(URL_HOST+'/api/programacion/imagen/'+foto+'.jpg')   
    }
    
    //const url='http://localhost:9529/api/programacion/imagen/'+foto+'.jpg'
    console.log(url)
  return (
    
      <Container fluid bsPrefix="container"  className="fotoradio">
           
          <div className="redes pt-2" >
            <Button variant="link" onClick={launchApp} rel="noreferrer" target="_blank"><img alt="" src={face} height="45px" width="45px" /></Button>
            <Button variant="link"  onClick={launchApp1} rel="noreferrer" target="_blank"><img alt="" src={instagram}  height="45px" width="45px" /></Button>
          </div>
          <div className=" mx-3 ">
          <Row xs={1} sm={1} md={2} lg={3}  >
          <Col lg={6} md={7} className="mt-2">
          
          {url.length===0?<div style={{width:"1080px",height:"1080px"}}></div>:<img alt="" src={url} height="99%" width="100%"/>}
          
          
          </Col >
          
          <Col lg={2}  className="hidden-contenido">
          
            </Col >
          <Col lg={4} md={5}   >
            <div className="audio-padre">
             
            <PlayPause url="http://186.33.235.85:8000/stream/radiopampa" alto="80px" ancho="80px" />
           
           <Row className="geilla-vivo">
             <Col>
            <Button variant="secondary" block onClick={onchangeGrilla}>Programación </Button>
            </Col>
            <Col>
           <Button variant="secondary" block onClick={onchangeFoto}>En Vivo</Button>
           </Col>
           </Row>
           <div className="logo">
             
              <img alt="" src={logo} height="100px" width="100px" />
              
             
           </div>
            </div>
            
          </Col>
          </Row>
          </div>
        
       
      </Container>
   
  );
}

export default Apps;