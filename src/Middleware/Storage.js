
//Se indica donde se guardaran las imagenes
import multer from "multer"

const guardar = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'./public/uploads')
    },filename: (req,file,cb) =>{ ////Se indica cual sera el nombre de la imagen
        if (file !== null){
            const ext = file.originalname.split('.').pop()
            cb(null,Date.now()+'.'+ext) //Guarda la fecha y la extension del archivo
        }
    }
})

//Filtro para que no se dupliquen imagenes y se valida el formato sea jpg y png
const filtro = (req,file,cb) => {
    if(file && (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' 
        || file.mimetype === 'image/png') ){
            cb(null,true)
        }
        else {
            cb(null,false)
        }
}

export const subirImagen = multer({storage: guardar, fileFilter: filtro})