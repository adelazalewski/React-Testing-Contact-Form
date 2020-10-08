import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ContactForm from "./ContactForm";

test('user can fill out and submit the form', async () => {
    //render the component
    render(<ContactForm />);


    
// query the virtual DOM, so we can work with the inputs
  const firstNameInput = screen.getByPlaceholderText(/edd/i);
const lastNameInput = screen.getByPlaceholderText(/burke/i);
const emailInput = screen.getByPlaceholderText(/bluebill/i);
//console.log(emailInput) //this helped me find a bug the palceholder should be on the email input not the label
const messageInput = screen.getByTestId(/message/i);
  //console.log(messageInput);
  const button = screen.getByTestId("input-submit");

  //check to see if you can fill out form inputs
//   if(firstNameInput.length<3 || firstNameInput.length === 3){
     
//   }else{
//       null
//   }
fireEvent.change(firstNameInput, {target: {value: "Adela"}});
fireEvent.change(lastNameInput, {target: {value: "Zalewski"}});
fireEvent.change(emailInput, {target: {value: "paliuadela@yahoo.com"}});
fireEvent.change(messageInput, {target: {value: "abcdefg..."}});

  //assertion to make sure the inputs comtain the values typed in
  expect(firstNameInput).toHaveValue("Adela"); //this test helped me find a bug
  expect(lastNameInput).toHaveValue("Zalewski");
  expect(emailInput).toHaveValue("paliuadela@yahoo.com");

  //check to see if the message input is required 
  expect(messageInput).toBeRequired();//this helps me make the message area required since imo is important on the contact form to know what it is that the user is looking for

  //check to see if you can submit the form 
  fireEvent.click(button);

  const formData = await screen.findByText(/adela/i) ;
  expect(formData).toHaveTextContent("adela");
  //doing the  maxLength test
//   expect(firstNameInput).toHaveValue("maxLength", {value: 3});

})