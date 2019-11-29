import decode from 'jwt-decode';
// import axios from 'axios';
export default class AuthHandler {
  login = (account, password) => {
    // Get a token from api server using the fetch api
    //Intead of axios, fetch has been used for experiencing difference betweem axios
      console.log("?????????????AuthHandler, login, account", account, "password", password);
    return this.fetch(`http://localhost:3000/login`, {
      method: 'POST',
      body: JSON.stringify({
        account,
        password
      })
    }).then(res => {
        if(res.status){
            this.setToken(res.token); // Save the token in localStorage
        }
        console.log(Promise.resolve(res));
        return Promise.resolve(res);
    });
  };
  loggedIn = () => {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken(); // Getting token from localstorage

    /**New thing i am learning here if token is not defined then giving null
     * and !null return true and !!null return false so with this comparison i can check
     * token validation with short expression unlike else specific checking token is null or "undefined"
     */
    return !!token && !this.isTokenExpired(token); // checking token expired or not and is there token or not
  };

  tokenCheck = () =>{
    const id_token = localStorage.getItem('id_token');
    if(id_token === "undefined" || id_token === null){
      return false;
    }
    else{
      return true;
    }
  };

  isTokenExpired = token => {
    try {
      const decoded = decode(token);
      // Checking if token is expired.
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      console.log('expired check failed! Line 50: AuthHandler.js');
      return false;
    }
  };

  setToken = idToken => {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);
  };
  logout = () => {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    localStorage.removeItem('sec');
  };

    getToken = () => {
        // Retrieves the user token from localStorage
        return localStorage.getItem('id_token');
    };

    logout = () => {
        console.log("AuthaHandler, logout");
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
    };

    getData = () => {
        /* Get payload information in frontside with using jwt-decode*/
        const data = decode(this.getToken());
        return data;
    };

    isAdmin = () => {
        const data = this.getData();
        if (data.type === 'admin') {
            return true;
        } else {
            return false;
        }
    };

    isCompany = () => {
        const data = this.getData();
        /**For now admin can have all the access so
         * even is company methods return true even it's admin
         */
        if (data.type === 'company' || data.type === 'admin') {
            return true;
        } else {
            return false;
        }
    };

    whenExpired = () => {
        const now = Date.now() / 1000;
        const exp = this.getData().exp - now;
        return exp;
    };

    //Here is for the experiencing fetch
    //there is also solution with axios post methods in own private extra javascript files
    fetch = (url, options) => {
        // performs api calls sending the required authentication headers
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        };
        // Setting Authorization header
        // Authorization: 'Bearer ' xxxxxxx.xxxxxxxx.xxxxxx
        //Here i use bearer schema, seems based on web searching many people recommend to use it
        //There is another options also like basic, diagest and so on
        if (this.loggedIn()) {
            headers['Authorization'] = 'Bearer ' + this.getToken();
        }

        return fetch(url, {
            headers,
            ...options
        })
        .then(this._checkStatus)
        .then(response => response.json());
    };

    _checkStatus = response => {
        // raises an error in case response status is not a success
        if (response.status >= 200 && response.status < 300) {
            // Success status lies between 200 to 300
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    };
}
//
// const mapStateToProps = (state) => {
//   return {
//       account: state.account,
//       user: state.user,
//       app: state.app
//   }
// };
//
// const mapDispatchToProps = (dispatch) => {
//     return {
//         onLoginUser: (user_id) => dispatch(asyncLoginUser(user_id))
//     }
// };
//
// export default connect(mapStateToProps, mapDispatchToProps)(AuthHandler);
// // export default AuthHandler;