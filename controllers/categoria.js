const {response} = require('express')
const Categoria = require('../models/Categoria')
const Modalidad = require('../models/Modalidad')

const getCategoria = async (req, resp = response ) => {
    try{
        const [categoria] = await Promise.all([
            Categoria.find()
        ])

        resp.json({
            ok: true,
            categoria
        })

    }catch (error) {

        console.log(error)

        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })

    }
}


const postCategoria = async (req, resp = response ) => {
 try {
            const categoria = new Categoria(req.body)
            await categoria.save()
              resp.json({
                ok: true,
                categoria
            })
        } catch (error) {
            console.log(error)
            resp.status(500).json({
                ok:false,
                msg:'Error inesperado... reivsar logs'
            })
        }
}

const putCategoria  = async (req, resp = response ) => {
        const uid = req.params.id
        try {
            const CategoriaDb = await Categoria.findById(uid)

            if(!CategoriaDb){
                return resp.status(400).json({
                    ok:false,
                    msg:'Esta Categoria no existe'
                })
                }

            const categoria = await Categoria.findByIdAndUpdate(uid, req.body, {new: true})

            resp.json({
                ok:true,
                categoria
                })  
           
        } catch (error) {
            console.log(error)
            resp.status(500).json({
                ok:false,
                msg:'Error inesperado... reivsar logs'
            })
        }
   }
