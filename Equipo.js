const {response} = require('express')
const Equipo = require('../models/Equipo')
const Categoria = require('../models/Categoria')

const getEquipo = async (req, resp = response ) => {

    try{
        const [equipo] = await Promise.all([
            Equipo.find()
        ])

        await Promise.all(equipo.map(async (equipo) => {

            var categoriasMapeadas = []
          
            await Promise.all(equipo.categoria.map(async (categoria) => {
          
              categoriasMapeadas.push(await Categoria.findById(categoria))
          
            }))
          
            equipo.categoria = categoriasMapeadas
          
          }))

        resp.json({
            ok: true,
            equipo
        })

    }catch (error) {

        console.log(error)

        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })

    }
}

