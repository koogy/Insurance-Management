import {useAuth} from "../../providers/AuthProvider"

export default function AuthentificationSuccess() {
    const authContext = useAuth()

    return (
        <div className="container">
            {(authContext.currentUser !== undefined) ?
                <div>
                 <h2>
                     <p>Bienvenue sur votre compte !</p>
                     <p>{authContext.currentUser.lastName.toUpperCase()} {authContext.currentUser.firstName}</p>
                </h2>
                </div> :
            <h3>Vous devez être connecté(e) pour pouvoir consulter cette page !</h3>
            }
        </div>
    )
}