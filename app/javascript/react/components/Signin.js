import React, { Component } from 'react'
// import FacebookLogin from 'react-facebook-login';
import axios from 'axios';
class Signin extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }


    componentDidMount() {
        // this.passCsrfToken(document, axios);
    }

    passCsrfToken(document, axios) {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = this.csrfToken(document);
    }

    csrfToken(document) {
        return document.querySelector('[name="csrf-token"]').content;
    }

    logInWithProvider = (provider, response) => {
        const endpoint = `/auth/${provider}/callback`;
        // const endpoint = `/auth/facebook/callback`;
        let signedRequest = response["accessToken"];
        const options = {
            method: 'get',
            url: endpoint + "?code="+ 'AQAabkiO2brWMGQFTON0SFdsVeDRBhiDYpXOwuqDkjvgosKP3a7Cc7fkzlEVxcOvpDArGXVQMipQ90zXux_T8Hya-NmZz1Rz1ptdksok7gAl0_23merQfj6iNLa2p_UWsYXz8GUBrvr8I4Dix9iRI4nKnFzvROTtUACFD1yUEGcxC_Ss2WuxoJSc5MkpeylhtjEwynwFSPDGjeVaBKgfn21ABU7oBS-m1SnwCzaVj7YAUlSh58xchBaN_JaBY6TwKGGE8W0KFF7NvJpST0AeQnlBe8y-azfQ2fTH0SY16QnQ64XCnGmML3yonTtenRRah_TocL0dw0uRs2IP2N4Ch2btCtDhCyTAbW_k1Sxsap5GKQ&state=09b628e0e00cbaf06c62c0487ebfd7444d98fa5d33eba201',
        
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // axios
        //     .post(endpoint,{ signed_request: response["signedRequest"] } , {headers: {
        //         'Content-Type': 'application/json'
        //     }})
        axios(options)
            .then(response => {
               console.log(response);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    render() {

        const responseFacebook = (response) => {
            console.log(response);
            if (!response.status) {
                const content = document.getElementById('login');
                const profileObj = {};
                profileObj.name = response.name
                profileObj.avatar_url = response.picture.data.url
                profileObj.oauth_type = "facebook"
                this.logInWithProvider("facebook", response)
            }
        }

        return (
            <div id="login">
                FB
                {/* <FacebookLogin
                    appId={973768456388872}
                    autoLoad={true}
                    fields="name,email,picture"
                    cssClass="dropdown-item"
                    callback={responseFacebook} /> */}
            </div>
        );
    }
}

export default Signin;