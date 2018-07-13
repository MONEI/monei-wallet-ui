import {Auth} from 'aws-amplify';

export const signUp = username => {
  return fetch(process.env.REACT_APP_API_ENDPOINT + '/signup', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({username})
  })
    .then(response => {
      if (!response.ok) {
        return response.json().then(err => {
          throw err;
        });
      }
      return response;
    })
    .then(() => Auth.signIn(username));
};
