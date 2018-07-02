import {PrepareCheckoutMutation} from 'api/mutations';
import {graphql} from 'react-apollo';
import Buy from './Buy';

export default graphql(PrepareCheckoutMutation, {
  props: ({mutate}) => ({
    prepareCheckout: data => {
      return mutate({
        variables: data,
        update: (client, {data: {prepareCheckout}}) => {
          window.location.href = prepareCheckout.checkoutUrl;
        }
      });
    }
  })
})(Buy);
