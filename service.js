import axios from 'axios';

class Service {
  constructor(authentication, service, parameters) {
    this.authentication = authentication;
    this.id = null;
    this.parameters = parameters;
    this.service = service;
  }

  async complete() {
    const data = {
      completedAt: new Date().toISOString()
    };
    await axios.put(`https://api.digitalleman.com/v2/functions/${this.id}`, { data: data }, {
      headers: {
        'authorization': `Bearer ${this.authentication.api}`
      }
    })
    .catch((error) => {
      console.log(error);
    });
  }

  async create() {
    const data = {
      parameters: this.parameters,
      service: this.service,
      socket: this.authentication.socket
    };
    await axios.post('https://api.digitalleman.com/v2/functions', { data: data }, {
      headers: {
        'authorization': `Bearer ${this.authentication.api}`
      }
    })
    .then((response) => {
      this.id = response.data.data.id;
    })
    .catch((error) => {
      console.log(error);
    });
  }
}

export default Service;