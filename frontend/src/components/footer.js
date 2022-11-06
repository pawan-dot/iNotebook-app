// import React from 'react';
// import { CDBFooter, CDBBox, CDBFooterLink, CDBBtn, CDBIcon, CDBContainer } from 'cdbreact';

// export const Footer = () => {
//     return (
//         <CDBFooter className="shadow-lg bg-success" style={{
//             width: '100%', position: "fixed",

//             bottom: "0"
//         }} >
//             <CDBBox

//                 display="flex"
//                 justifyContent="between"
//                 alignItems="center"
//                 className="mx-auto py-4 flex-wrap"

//             >
//                 <CDBBox display="flex" alignItems="center">
//                     <a href="/" className="d-flex align-items-center p-0 text-dark">
//                         {/* <img
//                             alt="logo"
//                             width="30px"
//                         /> */}
//                         <span className="ml-4 h5 mb-0 font-weight-bold">Devwares</span>
//                     </a>
//                     <small className="ml-2">&copy; Devwares, 2022. All rights reserved.</small>
//                 </CDBBox>
//                 <CDBBox display="flex">
//                     <CDBBtn flat color="dark" className="p-2">
//                         <CDBIcon fab icon="facebook-f" />
//                     </CDBBtn>
//                     <CDBBtn flat color="dark" className="mx-3 p-2">
//                         <CDBIcon fab icon="twitter" />
//                     </CDBBtn>
//                     <CDBBtn flat color="primary" className="p-2">
//                         <CDBIcon fab icon="instagram" />
//                     </CDBBtn>
//                 </CDBBox>
//             </CDBBox>
//         </CDBFooter>
//     );
// };
import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
    return (
        <footer className="bg-dark"
            style={{
                // backgroundColor: "black",
                // "rgb(2, 117, 216)",
                width: "100%",
                position: "fixed",
                bottom: 0,
                display: "flex",
                justifyContent: "center",
                // boxShadow: "50px"
            }}
        >
            <Container>
                <Row>
                    <Col className=" text-white  text-center py-3 ">Copyright &copy; iNotebook</Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;

