const {response} = require('express')
const Modalidad = require('../models/Modalidad')
const Categoria = require('../models/Categoria')


const getModalidad = async (req, resp = response ) => {

    try{
        const [modalidad] = await Promise.all([
            Modalidad.find()
        ])


        await Promise.all(modalidad.map(async (modalidad) => {

            var categoriasMapeadas = []
          
            await Promise.all(modalidad.categorias.map(async (categoria) => {
          
              categoriasMapeadas.push(await Categoria.findById(categoria))
          
            }))
          
            modalidad.categorias = categoriasMapeadas
          
          }))


        resp.json({
            ok: true,
            modalidad
        })


    }catch (error) {

        console.log(error)

        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })

    }
}


const postModalidad = async (req, resp = response ) => {
 try {
            const modalidad = new Modalidad(req.body)
            await modalidad.save()
              resp.json({
                ok: true,
                modalidad
            })
        } catch (error) {
            console.log(error)
            resp.status(500).json({
                ok:false,
                msg:'Error inesperado... reivsar logs'
            })
        }
}
