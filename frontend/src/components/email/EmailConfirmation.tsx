import {useParams} from "react-router";
import {useNavigate} from "react-router-dom";
import { parseURL } from "../../helpers/helperFunctions";
import {useAuth} from "../../providers/AuthProvider";

export default function EmailConfirmation() {
    let params = useParams();

    const navigate = useNavigate()
    const authContext = useAuth()
    console.log('here')

    const requestOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({token: params.token})
    };
    fetch(parseURL('/api/email-confirmation/confirm'), requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
                console.log("error : ")
                console.log(response)
            }
        })
        .then((data) => {
            authContext.loginUser(data)
            navigate("/user/signin/success")
        })
        .catch((error) => console.log(error));
    return (<div>email confirmed avec ce token : {params.token}</div>)

}