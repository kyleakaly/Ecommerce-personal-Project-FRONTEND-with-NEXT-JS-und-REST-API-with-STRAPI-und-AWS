import React from 'react'
import { Tab } from 'semantic-ui-react'
import Video from './Video'

const InformacionProductoTabs = ({obtenerJuegos}) => {

    if(!obtenerJuegos){
        return null
    }

    const paneles = [

        {

        menuItem : 'Informacion',
        render: () => (
            <Tab.Pane>
                <h1>Informacion Lectura</h1>
                <Video obtenerJuegos={obtenerJuegos}/>
                <p>Fecha de Lanzamiento: {obtenerJuegos.fechadelanzamiento}</p>
                <p>Categoria:  {obtenerJuegos.modolectura.data.attributes.title}</p>
            </Tab.Pane>
        )


        },
        {

            menuItem : 'Comentarios',
            render: () => (
                <Tab.Pane>
                    <h4>Comentarios</h4>
                    <p>comentario1......</p>
                    <p>comentario1......</p>
                </Tab.Pane>
            )
    
    
            }


    ]

  return (
    <Tab className="tabs-games" panes={paneles} />
  )
}

export default InformacionProductoTabs