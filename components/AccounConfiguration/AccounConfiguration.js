import React from 'react'
import CambiarPassword from './CambiarPassword/CambiarPassword'
import CambiarEmail from './Changesdatemuser/CambiarEmail/CambiarEmail'
import ChangeNameForm from './Changesdatemuser/ChangeNameForm/ChangeNameForm'
import DireccionConfigurar from './Changesdatemuser/DireccionConfigurar/DireccionConfigurar'

const AccounConfiguration = ({user,setReloadUser,logout}) => {
  return (
    <div className="account_configuration">
    <div className="title">Configuration</div>
    <div className="data">
       <ChangeNameForm logout={logout} setReloadUser={setReloadUser} user={user}/>
       <CambiarEmail logout={logout} setReloadUser={setReloadUser} user={user} />
       <CambiarPassword logout={logout} setReloadUser={setReloadUser} user={user} />
       <DireccionConfigurar logout={logout} setReloadUser={setReloadUser} user={user} />
    </div>
    
</div>
  )
}

export default AccounConfiguration