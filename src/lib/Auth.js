import {Auth} from 'aws-amplify';

const handleErrors = response => {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

export const signUp = username => {
  return fetch(process.env.REACT_APP_API_ENDPOINT + '/signup', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({username})
  })
    .then(handleErrors)
    .then(() => Auth.signIn(username));
};
