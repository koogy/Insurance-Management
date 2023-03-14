import {useAuth} from "../../providers/AuthProvider";

export default function Profile() {
    const authContext = useAuth()
    const currentUser = authContext.currentUser

    return (
        <div className="container">
            {(currentUser !== undefined) ?
                <div>
                    <header className="jumbotron">
                        <h2>
                             Mon profil
                        </h2>
                    </header>
                    <h4>
                        <strong>{currentUser.lastName.toUpperCase()} {currentUser.firstName}</strong>
                    </h4>
                    <p>
                        <strong>Adresse:</strong>{" "}
                        {currentUser.address}
                    </p>
                    <p>
                        <strong>Ville:</strong>{" "}
                        {currentUser.city}
                    </p>
                    <p>
                        <strong>Numéro de téléphone:</strong>{" "}
                        {currentUser.phoneNumber}
                    </p>
                    <p>
                        <strong>Email:</strong>{" "}
                        {currentUser.email}
                    </p>
                </div> :
                <div>
                    <h3>Vous devez être connecté(e) pour pouvoir consulter cette page !</h3>
                </div>
            }
        </div>
    )
}