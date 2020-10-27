import React, { useEffect, useState } from "react";
import { Form, Input, Select } from "antd";
import { Formik } from "formik";

let formProps, handleChange, setFieldTouched, triggerSubmit

const fieldTypes = ["input", "date", "time", "select"];

const useForm = (content) => {
  const [formView, setFormView] = useState(null)
  useEffect(() => {
    setFormView(buidForm())
  }, []);

  const handleSelectChange = (value, node) => {
    const {
      props: { name },
    } = node;
    handleChange({ target: { value, name } });
    setFieldTouched(name, true, false);
  };

  const onDataPick = (_, value, name) => {
    handleChange({ target: { value, name } });
    setFieldTouched(name, true, false);
  };
  const handleInputChange = (e) => {
    handleChange(e);
    setFieldTouched(e.target.name, true, false);
  };
  const buildField = (field) => {
    const { fieldType, name, placeholder, options } = field;
    const { values } = formProps;
    const value = values[name];
    if (!fieldTypes.includes(fieldType)) throw new Error("invalid field type");
    switch (fieldType) {
      case "select":
        return (
          <Select onChange={handleSelectChange}>
            {options.map((option) => (
              <Select.Option name="type" value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        );
      case "input":
        return (
          <Input
            onChange={handleInputChange}
            name={name}
            value={value}
            placeholder={placeholder}
          />
        );
      default:
        return <div />;
    }
  };
  const buidForm = () => {
    const { handleSubmit } = content.eventHandlers;
    const { validationSchema, initialValues, layout, rows } = content;
    return (
      <Formik
        enableReinitialize
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        // displayPreviousForm={displayPreviousForm}
      >
        {(props) => {
          formProps = props;
          handleChange = props.handleChange;
          setFieldTouched = props.setFieldTouched;
          triggerSubmit = props.handleSubmit
          return (
            <Form layout={layout || "vertical"}>
              {rows.map((row) => {
                const isSingleRowVariant = row.variant === "single";
                if (isSingleRowVariant) {
                  return (
                    <Form.Item label={row.item.label}>
                      {buildField(row.item.field)}
                    </Form.Item>
                  );
                }
                return (
                  <Form.Item style={{ marginBottom: 0 }}>
                    {row["item"]((item) => (
                      <div>
                        <Form.Item
                          label={item.label}
                        style={{ display: "inline-block",
      width: "calc(50% - 12px)"}}
                          className="half_view_form"
                        >
                          {buildField(item.field)}
                        </Form.Item>
                        <span
                          style={{
                            display: "inline-block",
                            width: "12px",
                            textAlign: "center",
                          }}
                        />
                      </div>
                    ))}
                  </Form.Item>
                );
              })}
            </Form>
          );
        }}
      </Formik>
    );
  };
      return [formView, triggerSubmit ]

};
export default useForm