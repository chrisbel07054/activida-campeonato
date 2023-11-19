const {response} = require('express')
const Patrocinador = require('../models/Patrocinador')

const getPatrocinador = async (req, resp = response ) => {
    try{
        const [patrocinador] = await Promise.all([
            Patrocinador.find()
        ])

        resp.json({
            ok: true,
            patrocinador
        })

    }catch (error) {

        console.log(error)

        resp.status(500).json({
            ok:false,
            msg:'Error inesperado... reivsar logs'
        })

    }
}


const postPatrocinador = async (req, resp = response ) => {
 try {
            const {patrocinio} = req.body
            const patrocinios = [
                "Diamante - 100$",
                "Oro - 80$",
                "Plata - 60$",
                "Bronce - libre",
                "Padrino - libre"
              ];
          
              const patrocinioBuscado = patrocinio.toLowerCase().replace(/\s/g, "");
          
              if (!patrocinios.some(p => p.toLowerCase().replace(/\s/g, "") === patrocinioBuscado)) {
                return resp.status(500).json({
                  ok: false,
                  msg:
                    "Ese patrocinio no existe, recuerda que los que existen son: Diamante - 100$, Oro - 80$, Plata - 60$, Bronce - libre, Padrino - libre"
                });
              }
     
            const patrocinador = new Patrocinador(req.body)

            await patrocinador.save()
           
            resp.json({
                ok: true,
                patrocinador
            })

        } catch (error) {
            console.log(error)
            resp.status(500).json({
                ok:false,
                msg:'Error inesperado... reivsar logs'
            })
        }
}

