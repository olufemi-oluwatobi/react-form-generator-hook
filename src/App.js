import React from "react";
import useForm from "./createForm"
import "./styles.css";


export default function App() {
  const content = {
    eventHandlers: {
      handleSubmit: (value) => console.log(value)
    },
    initialValues: {
      car: "",
      dog: ""
    },
    rows: [{
      variant: "single",
      item: {label:"Cat", field: {name: "cat", fieldType: "input"}}
    }]
  }
  const [form, triggerSubmit] = useForm(content)
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      {form}
    </div>
  );
}
