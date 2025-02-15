import {Router} from 'express'
import { getJuegos,saveJuego } from '../Controllers/juegosController.js'
import { subirImagen } from '../Middleware/Storage.js'
import { verificar } from '../Middleware/Auth.js'
const rutas = Router()

rutas.get('/api/juegos',verificar, getJuegos)
rutas.get('/api/juegos/:id', getJuegos)
rutas.post('/api/juegos', subirImagen.single('imagen'), saveJuego)

export default rutas