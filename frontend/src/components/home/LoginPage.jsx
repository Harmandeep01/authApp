import './LoginPage.css'
// import person_icon from '../../assets/person.png'
// import email_icon from '../../assets/email.png'
// import password_icon from '../../assets/password.png'
import bkg from '../../assets/backgroundImage.png'
import appStoreIcon from '../../assets/appStore.png'
import playStoreIcon from '../../assets/playStore.png'
const LoginPage = () => {
        return (
    <div className="container">
        <div className="backgroundImage">
            <img src={bkg} alt="" />
        </div>
        <div className="content">
            <h2 className="main-text">
                Say hello to the world
            </h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum aspernatur dolore molestiae accusamus alias magni quidem, dolores blanditiis.</p>
            <button>Sign up for free</button>
            <div className="download-platforms">
              <img src={appStoreIcon} alt="App Store Button" />
              <img src={playStoreIcon} alt="Play Store Button" />
            </div>
        </div>
    </div>
)}
export default LoginPage;
