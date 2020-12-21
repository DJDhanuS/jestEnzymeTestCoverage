// import React from 'react';
// import {
//   Modal,
//   Row,
//   Navbar,
//   Nav,
//   NavItem,
//   FormControl,
//   DropdownButton,
//   Dropdown,
// } from 'react-bootstrap';
// import { FaFileUpload, FaCopy, FaRegEdit } from 'react-icons/fa';

// import axios from 'axios';
// import { UPLOAD_PRIVATE_KEY_URL, generateUUID } from '../../utils/AppUtils';

// class FileUploadModal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: '',
//       fileName: '',
//       file: '',
//       panelVisible: 'Update',
//       title: 'Requested',
//       certId: '',
//     };
//     this.showModal = this.showModal.bind(this);
//     this.handleUpload = this.handleUpload.bind(this);
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.saveFile = this.saveFile.bind(this);
//     this.renderDropdown = this.renderDropdown.bind(this);
//     this.handleNavigation = this.handleNavigation.bind(this);
//     this.renderComponents = this.renderComponents.bind(this);
//     // this.handleInputId = this.handleInputId.bind(this);
//   }

//   // handleInputId = (e) => {
//   //   // eslint-disable-next-line no-console
//   //   console.log(e.target.value);
//   // };

//   showModal() {
//     this.setState({
//       value: '',
//       fileName: '',
//     });
//     this.props.showModal();
//   }

//   saveFile() {
//     const baseUrl = `${UPLOAD_PRIVATE_KEY_URL}/${this.props.id}`;
//     const data = new FormData();
//     data.append('file', this.state.file);

//     // eslint-disable-next-line no-console
//     console.log(this.state.value);
//     // eslint-disable-next-line no-console
//     console.log(generateUUID);
//     // eslint-disable-next-line no-console
//     console.log(this.props.id);
//     // eslint-disable-next-line no-console
//     console.log(this.state.fileName);
//     // eslint-disable-next-line no-console
//     console.log(this.state.file);
//     // eslint-disable-next-line no-console
//     console.log(baseUrl);
//   }

//   handleInputChange(e) {
//     this.setState({
//       value: e.target.value,
//     });
//   }

//   handleUpload(e) {
//     const baseUrl = `${UPLOAD_PRIVATE_KEY_URL}/bc67457b-1202-42f1-99c2-6ec7d8ee07e4`;
//     // const baseUrl = `${UPLOAD_PRIVATE_KEY_URL}/${this.props.id}`;
//     const reader = new FileReader();
//     const fileName = e.target.files[0].name;
//     const file = e.target.files[0];
//     const data = new FormData();
//     data.append('file', file);
//     data.append('name', fileName);
//     axios
//       .post(baseUrl, data, {
//         headers: {
//           intuit_tid: generateUUID(),
//           'Content-Type': 'multipart/form-data',
//           'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
//         },
//       })
//       .then((res) => {
//         // eslint-disable-next-line no-console
//         console.log('file upload!!11111', res);
//       })
//       .catch((error) => {
//         // eslint-disable-next-line no-console
//         console.log('file upload error2222222!!', error);
//       });

//     reader.onloadend = () => {
//       const content = reader.result;
//       this.setState({
//         value: content,
//         fileName,
//         file,
//       });
//     };
//     reader.readAsText(e.target.files[0]);
//   }

//   handleNavigation(view) {
//     this.setState({
//       panelVisible: view,
//     });
//   }

//   renderComponents() {
//     if (this.state.panelVisible === 'Copy') {
//       return (
//         <Row style={{ padding: '10px' }}>
//           <label style={{ fontSize: '20px' }}>ID : </label>
//           <FormControl
//             style={{
//               width: '82%',
//               outline: 'none',
//               fontSize: '1vw',
//               display: 'inline-block',
//               marginLeft: '10px',
//             }}
//             type="text"
//             value={this.state.certId}
//             placeholder="Ex:bc67457b-1202-42f1-99c2-6ec7d8ee07e4"
//             onChange={(e) => this.handleInputId(e)}
//             className="provider-search-box"
//           />
//         </Row>
//       );
//     }
//     if (this.state.panelVisible === 'Update') {
//       return <Row style={{ padding: '10px' }}>{this.renderDropdown()}</Row>;
//     }
//     return <span />;
//   }

//   renderDropdown() {
//     const btStyle = {
//       marginRight: '10px',
//       float: 'left',
//       minWidth: '120px',
//       minHeight: '33px',
//       marginTop: '3px',
//       fontWeight: '500',
//     };

//     return (
//       <div>
//         <DropdownButton
//           className="btn-group"
//           bsStyle="primary"
//           style={btStyle}
//           title={this.state.title}
//           id="certificateID"
//         >
//           <Dropdown.Item value="Requested" onClick={() => this.setState({ title: 'Requested' })}>
//             Requested
//           </Dropdown.Item>
//           <Dropdown.Item value="Active" onClick={() => this.setState({ title: 'Active' })}>
//             Active
//           </Dropdown.Item>
//           <Dropdown.Item
//             value="Due_Renewal"
//             onClick={() => this.setState({ title: 'Due_Renewal' })}
//           >
//             Due_Renewal
//           </Dropdown.Item>
//           <Dropdown.Item value="Expired" onClick={() => this.setState({ title: 'Expired' })}>
//             Expired
//           </Dropdown.Item>
//           <Dropdown.Item
//             value="Renewal_Submited"
//             onClick={() => this.setState({ title: 'Renewal_Submited' })}
//           >
//             Renewal_Submited
//           </Dropdown.Item>
//         </DropdownButton>
//       </div>
//     );
//   }

//   render() {
//     return (
//       <Row>
//         <Modal
//           dialogClassName="modal-90w"
//           size="lg"
//           show={this.props.state}
//           onHide={this.showModal}
//           aria-labelledby="example-modal-sizes-title-lg"
//         >
//           <Modal.Header closeButton>
//             <Modal.Title id="example-modal-sizes-title-lg">
//               Upload Certificate (Cert_ID: {this.props.id})
//             </Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <div>
//               <Navbar
//                 style={{
//                   backgroundColor: '#0077c5',
//                   position: 'sticky',
//                   top: '0',
//                   zIndex: '3',
//                 }}
//               >
//                 <div className="container">
//                   <Nav>
//                     <NavItem
//                       className="nav-text selected"
//                       key="navHome"
//                       onClick={() => this.handleNavigation('Update')}
//                     >
//                       <FaRegEdit style={{ color: 'white', marginLeft: '0px', marginTop: '-2px' }} />
//                       <b>Update Status</b>
//                     </NavItem>
//                     <NavItem
//                       className="nav-text"
//                       key="navSearch"
//                       onClick={() => this.handleNavigation('Copy')}
//                     >
//                       <FaCopy style={{ color: 'white', marginLeft: '10px' }} />
//                       <b>Copy existing</b>
//                     </NavItem>
//                     <NavItem
//                       className="nav-text"
//                       key="navSearch"
//                       onClick={() => this.handleNavigation('Upload')}
//                     >
//                       <FaFileUpload style={{ color: 'white', marginLeft: '10px' }} />
//                       <b>Upload</b>
//                     </NavItem>
//                   </Nav>
//                 </div>
//               </Navbar>
//             </div>
//             <div className="div-box-shadow">
//               <div>
//                 {this.renderComponents()}
//                 <Row style={{ padding: '10px' }}>
//                   <textarea
//                     className="textarea is-code will-clear"
//                     id="data"
//                     name="data"
//                     data-gramm_editor="false"
//                     spellCheck="false"
//                     autoFocus=""
//                     placeholder="{}"
//                     value={this.state.value}
//                     rows="5"
//                     style={{ width: '600px', height: '400px' }}
//                     onChange={(e) => this.handleInputChange(e)}
//                   />
//                 </Row>
//               </div>
//               <Row>
//                 {this.state.panelVisible === 'Upload' ? (
//                   <label className="custom-file-upload">
//                     <input type="file" accept="file/*" onChange={(e) => this.handleUpload(e)} />
//                     Upload
//                   </label>
//                 ) : (
//                   <label className="custom-file-upload" onClick={this.saveFile}>
//                     Update
//                   </label>
//                 )}
//               </Row>
//             </div>
//           </Modal.Body>
//         </Modal>
//       </Row>
//     );
//   }
// }
// export default FileUploadModal;
