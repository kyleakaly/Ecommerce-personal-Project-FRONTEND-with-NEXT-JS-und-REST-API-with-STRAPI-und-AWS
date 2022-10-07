import React,{useState,useEffect} from 'react'
import { Container,Grid,Image,Input } from 'semantic-ui-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const TopBar = () => {
  return (
    <div className='top-bar'>
        <Container>
            <Grid className='top-bar'>
                <Grid.Column width={8} className="top-bar_left">
                    <Logo/>
                </Grid.Column>

                <Grid.Column width={8} className="top-bar_right">
                    <Search/>
                </Grid.Column>

            </Grid>
        </Container>
    </div>
  )
}

export default TopBar

function Logo(){
    return(
        <Link href="/">
            <a className='displayflex'>
             <Image className='imagenlogo' src="/logo.svg" alt="MiLogo" style={{width:'100px', height:'auto'}}/> 
            </a>
        </Link>
    )
}

const Search = () => {

    const [datosUsuario,setDatosUsuario] = useState('')
    const [load,setLoad] = useState(false)
    const router = useRouter();

    useEffect(() => {
        
        if(load){
            router.push(`/search?query=${datosUsuario}`)

        }

        setLoad(true)

    }, [datosUsuario])
    
 

    return(
        <Input 
        id="search-manga"
        icon={{ name:"search" }}
        value={router.query.query}
        onChange={(e)=>{setDatosUsuario(e.target.value)}}
        />
    )
}