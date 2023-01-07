import axios from "axios";

class Service {
  constructor(authentication, service, parameters) {
    this.authentication = authentication;
    this.parameters = parameters;
    this.service = service;
    apiConstructor();
  }

  apiConstructor() {
    const data = {
      parameters: this.parameters,
      service: this.service
    };
    axios.post('https://api.digitalleman.com/v2/functions', { data: data }, {
      headers: {
        'authorization': `Bearer ${this.authentication}`
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

module.exports = Service;