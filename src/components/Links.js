import React,{useEffect, useState} from 'react';
import LinkForm from './LinkForm';
import {db} from '../firebase';
import swal from 'sweetalert';

const Links = () => {
    const [links, setLinks]= useState([]);
    const[currentId, setCurrentId]= useState("");

    const addOrEditLink = async(linkObject) =>{
        try{
            if(currentId === ""){
                await db.collection('links').doc().set(linkObject);
                swal({
                  title: "Link agregado!",
                  text: "El enlace se añadió correctamente!",
                  icon: "success",
                  button: "Genial!",
                });
            }else{
                await db.collection('links').doc(currentId).update(linkObject);
                swal({
                  title: "Link editado!",
                  text: "El enlace se editó correctamente!",
                  icon: "success",
                  button: "Genial!",
                });
                setCurrentId("");
            }
        }catch(error){
            console.error(error);
        }
    }

    const borrar = async(id) =>{
        return await db.collection('links').doc(id).delete();
    }

    const onDeleteLink = (id) =>{
            swal({
              title: "Está seguro de querer eliminar el Link?",
              text: "Una vez eliminado, no se podrá volver a acceder a ese enlace!",
              icon: "warning",
              buttons: true,
              dangerMode: true,
            })
            .then((willDelete) => {
              if (willDelete) {
                borrar(id);
                swal("El Link ha sido borrado!", {
                  icon: "success",
                });
              } else {
                swal("El link no se eliminó!");
              }
            });
    }

    const getLinks = async() =>{
        db.collection('links')
            .onSnapshot((querySnapshot) => {
                const docs = [];
                    querySnapshot.forEach((doc) =>{
                        docs.push({...doc.data(), id: doc.id})
                    });
                    setLinks(docs);
            });
    };

    useEffect(()=> {
        getLinks();
    }, []);

    return (
        <div>
            <LinkForm {...{addOrEditLink, currentId, links}}/>
            <div>
                {links.map(link => (
                    <div className="card mb-1" key={link.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between">
                                <h5>{link.name}</h5>
                                <div>
                                    <i className="material-icons text-danger" onClick={() => onDeleteLink(link.id)}>close</i>
                                    <i className="material-icons" onClick={()=> setCurrentId(link.id)}>create</i>
                                </div>
                            </div>
                            <a href={link.url} target="_blank" rel="noopener noreferrer">Ir al Sitio</a>
                        </div>
                    </div>
                ))}
            </div>
    </div>
    )
}
 export default Links;
