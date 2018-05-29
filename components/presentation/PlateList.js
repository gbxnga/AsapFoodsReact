import Plate from './Plate'

const PlateList = ({user={},deletePlate=f=>f,plates=[]}) =>
    <div id="media-con-new">
        {(plates.length === 0) ?
            console.log(plates) : 
                    
            plates.map(plate=><Plate deletePlate={()=>deletePlate(user.details.auth_token,plate.id)} key={plate.id} plate={plate}/>)
        }
    </div>

module.exports = PlateList;