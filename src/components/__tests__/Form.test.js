import React from "react";

import { render, cleanup, getByPlaceholderText, getByTestId, prettyDOM, getByText, queryByText } from "@testing-library/react";

import Form from "components/Appointment/Form";
import { fireEvent } from "@testing-library/react";


afterEach(cleanup);

describe("Form", () => {

  const interviewers = [
    {
      id: 1,
      name: "Sylvia Palmer",
      avatar: "https://i.imgur.com/LpaY82x.png"
    }
  ];

  it("renders without crashing", () => {
    render(<Form interviewers={interviewers}/>);
  });

  it("renders without student name if not provided", () => {
    const { getByPlaceholderText } = render(
      <Form interviewers={interviewers} />
    );
    const input = getByPlaceholderText("Enter Student Name")
    expect(input).toHaveValue("");
  });

  it("renders with initial student name", () => {
    const {getByTestId} = render(<Form student={"Lydia Miller-Jones"} interviewers={interviewers}/>);
    const input = getByTestId("student-name-input");
    // console.log(prettyDOM(input));
    expect(input).toHaveValue("Lydia Miller-Jones");
  });
  
  it("validates that the student name is not blank", () => {
    /* 1. validation is shown */
    const onSave = jest.fn()


    const {getByText} = render(
      <Form student={""} interviewers={interviewers}/>
    );
    
    fireEvent.click(getByText("Save"));
    /* 2. onSave is not called */
    
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  });

  it("can successfully save after trying to submit an empty student name", () => {
    const onSave = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form interviewers={interviewers} onSave={onSave} />
    );
  
    fireEvent.click(getByText("Save"));
  
    expect(getByText(/student name cannot be blank/i)).toBeInTheDocument();
    expect(onSave).not.toHaveBeenCalled();
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Save"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(onSave).toHaveBeenCalledTimes(1);
    expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  });

  it("calls onCancel and resets the input field", () => {
    const onCancel = jest.fn();
    const { getByText, getByPlaceholderText, queryByText } = render(
      <Form
        interviewers={interviewers}
        name="Lydia Mill-Jones"
        onSave={jest.fn()}
        onCancel={onCancel}
      />
    );
  
    fireEvent.click(getByText("Save"));
  
    fireEvent.change(getByPlaceholderText("Enter Student Name"), {
      target: { value: "Lydia Miller-Jones" }
    });
  
    fireEvent.click(getByText("Cancel"));
  
    expect(queryByText(/student name cannot be blank/i)).toBeNull();
  
    expect(getByPlaceholderText("Enter Student Name")).toHaveValue("");
  
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
  
  // it("calls onSave function when the name is defined", () => {
    
  //   const onSave = jest.fn()

  //   const {getByText, queryByText} = render(
  //     <Form 
  //     student="Lydia Miller-Jones" 
  //     interviewers={interviewers}
  //     onSave={onSave}
  //     />
  //   );

  //   fireEvent.click(getByText("Save"));
  //   expect(queryByText(/student name cannot be blank/i)).toBeNull();
  //   expect(onSave).toHaveBeenCalledTimes(1);
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  // });

  // it("submits the name entered by the user", () => {
  //   const onSave = jest.fn();
  //   const { getByText, getByPlaceholderText } = render(
  //     <Form interviewers={interviewers} onSave={onSave} />
  //   );
  
  //   const input = getByPlaceholderText("Enter Student Name");
  
  //   fireEvent.change(input, { target: { value: "Lydia Miller-Jones" } });
  //   fireEvent.click(getByText("Save"));
  
  //   expect(onSave).toHaveBeenCalledTimes(1);
  //   expect(onSave).toHaveBeenCalledWith("Lydia Miller-Jones", null);
  // });
});