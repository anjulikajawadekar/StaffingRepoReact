import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ReactModal from 'react-modal';
import history from './ResponseVal';
import { toast } from "react-toastify";

class ModalWithCSS extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      // navigate: useNavigate()
    };
    //  let navigate = useNavigate();
    this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);
  }

  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleUpdateProfile() {
    history.push("/update_profile");
    window.location.reload();
  }

  handleClose() {
    // let navigate = useNavigate();
    // navigate("/login");
    //this.props.navigate("/login");

   // history.push("/admin_dashboard1");
    window.location.reload();
  }

  logout() {
    localStorage.clear();
    history.push("/");
    toast.success("Logout successfully!",
      { position: "top-right" })
    window.location.reload();

  }

  render() {
    let empID = localStorage.getItem('empID');
    let empName = localStorage.getItem('empName');
    let empMail = localStorage.getItem('empMail');
    return (

      <div>
        <button className="btn btn-primary w-100 theme-btn mx-auto"
          style={{ color: 'white', margin: '15px' }} onClick={this.handleOpenModal}>View Profile</button>
        <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">

          <ReactModal
            isOpen={this.state.showModal}
            contentLabel="onRequestClose Example"
            onRequestClose={this.handleCloseModal}
            className="Modal"
          // overlayClassName="Overlay"
          >
            <div style={{ textAlign: "right" }}>

              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={this.handleClose}></button>

            </div>

            <p style={{ margin: '0px', padding: '0px', textAlign: 'center' }}><b>{empName}</b></p>
            <p style={{ textAlign: 'center' }}>{empMail}</p><hr></hr>

            {/* <p style={{ margin: '0px', padding: '0px' }}>Modal text!{empID}</p> */}

            <div className="text-center">
              <div className='row'>
                <div className='col-1'></div>

                <div className='col-5'>
                  <button
                    type="submit"
                    className="btn btn-primary w-150 theme-btn mx-auto"
                    onClick={this.handleUpdateProfile}
                  >
                    Update Profile
                  </button>
                </div>
                <div className='col-5'>
                  <button
                    type="reset"
                    className="btn btn-secondary w-100 theme-btn mx-auto"
                    onClick={this.logout}
                  >
                    Logout
                  </button>

                </div>
                <div className='col-1'></div>
              </div>

            </div>

          </ReactModal>
          {/* ---------------------------------------------------------------------------------- */}
        </div>
      </div >
    );
  }
}
// const props = {};
// ReactDOM.render(<ExampleApp {...props} />, document.getElementById('main'))
export default ModalWithCSS;