import axios from 'axios';

class Service {
  constructor(authentication, service, parameters) {
    this.authentication = authentication;
    this.id = null;
    this.parameters = parameters;
    this.service = service;
  }

  async create() {
    const data = {
      parameters: this.parameters,
      service: this.service
    };
    await axios.post('https://api.digitalleman.com/v2/functions', { data: data }, {
      headers: {
        'authorization': `Bearer ${this.authentication}`
      }
    })
    .then((response) => {
      this.id = response.data.data.id;
    })
    .catch((error) => {
      console.log(error);
    });
    return this.id;
  }

  api = {
    async create() {
      console.log(this.parameters);
      const data = {
        parameters: this.parameters,
        service: this.service
      };
      console.log(data);
      await axios.post('https://api.digitalleman.com/v2/functions', { data: data }, {
        headers: {
          'authorization': `Bearer ${this.authentication}`
        }
      })
      .then((response) => {
        return response;
      })
      .catch((error) => {
        //console.log(error);
      });
    },
    async update() {
      const data = {
        completedAt: new Date().toISOString()
      };
      await axios.put(`https://api.digitalleman.com/v2/functions/${super.id}`, { data: data }, {
        headers: {
          'authorization': `Bearer ${super.authentication}`
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
}

export default Service;