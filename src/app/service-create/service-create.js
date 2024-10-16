'use client';
import axios from 'axios';
import React, { Component } from 'react';
import { DropzoneComponent } from 'react-dropzone-component';

export default class CreateNewService extends Component {
  constructor(props) {
    super(props);

    this.state = {
      services_name: "",
      services_large_description: "",
      services_image: null
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentConfig = this.componentConfig.bind(this);
    this.djsConfig = this.djsConfig.bind(this);
    this.handleImageDrop = this.handleImageDrop.bind(this);
  }

  componentConfig() {
    return {
      iconFiletypes: [".jpg", ".png"],
      showFiletypeIcon: true,
      postUrl: "https://httpbin.org/post"
    }
  }

  djsConfig() {
    return {
      addRemoveLinks: true,
      maxFiles: 1
    }
  }

  handleImageDrop(file) {
    this.setState({
      services_image: file
    });
  }

  buildForm() {
    let formData = new FormData();
    formData.append("services_name", this.state.services_name);
    formData.append("services_large_description", this.state.services_large_description);
    if (this.state.services_image) {
      formData.append("services_image", this.state.services_image);
    }
    return formData;
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = this.buildForm();
    
    console.log("Form data:", formData); 

    axios.post('https://oasis-backend-nfuv.onrender.com/services', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,  
    })
    .then(response => {
      console.log('Service added', response.data);
      this.setState({
        services_name: "",
        services_large_description: "",
        services_image: null
      });
    })
    .catch(error => {
      console.error('Error adding service', error);
    });
  }


  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    return (
      <div className="create-new-service-container">
        <h2>Crear Servicio</h2>
        <form className="service-form" onSubmit={this.handleSubmit}>
          <input
            type="text"
            className="service-input"
            onChange={this.handleChange}
            name="services_name"
            placeholder="Service Name"
            value={this.state.services_name} 
          />
          <textarea
            className="service-textarea"
            onChange={this.handleChange}
            name="services_large_description"
            placeholder="Large Description"
            value={this.state.services_large_description}
          />
          
          <div className="dropzone-container">
            <DropzoneComponent
              config={this.componentConfig()}
              djsConfig={this.djsConfig()}
              eventHandlers={{
                addedfile: this.handleImageDrop,
              }}
            >
              <div className='dz-message'>Añadir Imagen</div>
            </DropzoneComponent>
          </div>

          <button className='btn-save-service'>Save Service</button>
        </form>
    </div>
    );
  }
}
