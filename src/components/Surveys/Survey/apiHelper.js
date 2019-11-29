
export async function getQuestion(){
    return fetch(`/questions`)
    .then( res => {
        if(!res.ok){
            if(res.status >= 400 && res.status < 500){
                return res.json().then( data => { 
                        let err = {errorMessage: data.message} 
                        throw err;
                    })
            } else {
                let err = {errorMessage: 'Server is offline, please try again!'}
                throw err;
            }
        }
        return res.json();
    })
}

export async function getAnswerOpt(){
    return fetch('/answer_options')
    .then( res => {
        if(!res.ok){
            if(res.status >= 400 && res.status < 500){
                return res.json().then( data => { 
                        let err = {errorMessage: data.message} 
                        throw err;
                    })
            } else {
                let err = {errorMessage: 'Server is offline, please try again!'}
                throw err;
            }
        }
        return res.json();
    })
}