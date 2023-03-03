const { json } = require("body-parser");
const express = require("express");
const server = express();

let publications = [];

server.use(express.json());
let id = 1;
server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;
  if (author && title && contents) {
    const publication = {
      author,
      title,
      contents,
      id: id++,
    };
    publications.push(publication);
    res.status(200).json(publication);
  } else {
    return res.status(404).json({
        error:
          "No se recibieron los parámetros necesarios para crear la publicación",
      });
  }
});
server.get("/posts", (req, res)=>{
    const {author , title} = req.query
    if(author && title){
        const publicationsFiltrado = publications.filter(publi=>publi.author===author && publi.title===title)
        publicationsFiltrado.length
        ? res.status(200).json(publicationsFiltrado)
        : res.status(404).json({error: "No existe ninguna publicación con dicho título y autor indicado"})
    } else{
        return res.status(404).json({error: "No existe ninguna publicación con dicho título y autor indicado"})
    }
})
server.get("/posts/:author", (req, res)=>{
    const {author} = req.params;
    if(author){
        const publiAuthorfiltradas = publications.filter(publi=>publi.author===author)
        publiAuthorfiltradas.length
        ? res.status(200).json(publiAuthorfiltradas)
        : res.status(404).json({error: "No existe ninguna publicación del autor indicado"})
    }else{
        return res.status(404).json({error: "No existe ninguna publicación del autor indicado"})
    }
})
server.put("/posts/:id",(req,res)=>{
    const {id} = req.params;
    const {title, contents} = req.body;
    if(id && title && contents){
    let filtrarid= publications.find(publi=> publi.id === Number(id) )
    if(!filtrarid){
        res.status(404).json({error: "No se recibió el id correcto necesario para modificar la publicación"})
    }else{
        filtrarid ={
            ...filtrarid, title , contents
        }
        res.status(200).json(filtrarid)
    }

    }else{
        return res.status(404).json({error: "No se recibió el id de la publicación a eliminar"})
    }
})
server.delete("/posts/:id", (req,res)=>{
    const {id} = req.params;
    if(!id){
        return res.status(404).json({error: "No se recibió el id de la publicación a eliminar"})
    }else{
        let filtrarid= publications.filter(publi=> publi.id !== Number(id))
        if(publications.length === filtrarid.length){
           return res.status(400).json({error: "No se recibió el id correcto necesario para eliminar la publicación"})
        }else{
            publications = filtrarid
            res.status(200).json({success:true})
        }
    }
})
//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
