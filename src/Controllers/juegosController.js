import mongoose from "mongoose";
import * as fs from 'fs'

const esquema = new mongoose.Schema({
    nombre:String, imagen:String, niveles:Number,fecha:Date
})
const JuegoModel = new mongoose.model('juegos',esquema)

export const getJuegos = async(req,res) =>{
    try{
        const {id} = req.params
        const rows = (id === undefined) ? await JuegoModel.find() : await JuegoModel.findById(id)
        return res.status(200).json({status:true,data:rows})
    }
    catch(error){
        return res.status(500).json({status:false,errors:[error]})

    }
}

export const saveJuego = async(req,res) =>{
    try{
        const {nombre,niveles,fecha} = req.body
        const validacion = validar(nombre,niveles,fecha,req.file,'Y')
        if(validacion == ''){
            const nuevoJuego = new JuegoModel({
                nombre:nombre,niveles:niveles,fecha:fecha,
                imagen:'/uploads/'+req.file.filename
            })
            return await nuevoJuego.save().then(
                () => { res.status(200).json({status:true,message:'Juego guardado'})}
            )
        }
        else{
            return res.status(400).json({status:false,errors:validacion})
        }
    }
    catch(error){
        return res.status(500).json({status:false,errors:[error.message]})

    }
}

const validar = (nombre,niveles,fecha,img,sevalida) =>{
    var errors = []
    if(nombre === undefined || nombre.trim() === ''){
        errors.push('El nombre no debe estar vacio')
    }
    if (niveles === undefined || niveles.trim() === '' || isNaN(niveles)){
    errors.push('El numero de niveles no debe estar vacio y debe ser numerico')
    } 
    if (fecha === undefined || fecha.trim() === '' || isNaN(Date.parse(fecha))){
        errors.push('La fecha no debe estar vacia y debe ser fecha valida')
    }  
    if(sevalida === 'Y' && img === undefined){
        errors.push('Seleccionar una imagen en formato jpg o png')
    }
    else{
        if(errors != ''){
            fs.unlinkSync('./public/uploads/'+img.filename)
        }
    }
    return errors 
}