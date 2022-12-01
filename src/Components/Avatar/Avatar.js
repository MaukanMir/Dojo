//styles imports here
import "./Avatar.css";
//svg logo imports here


const Avatar = ({src}) => {
  return (
    <div className ="avatar">
        <img
        src={src}
        alt ="user avatar"
        />
    </div>
  )
}

export default Avatar