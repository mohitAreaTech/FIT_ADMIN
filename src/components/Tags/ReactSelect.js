import React, { Component, useEffect, useState } from "react";
import Select from "react-select";
import { FixedSizeList as List } from "react-window";
const ReactSelect = ({
  options,
  name,
  placeholder,
  defaultValue,
  onChange = () => {},
}) => {
  const [selectedValue, setSelectedValue] = useState(null);

  useEffect(() => {
    console.log("defaultValue", defaultValue);
    if (
      defaultValue &&
      options.some((option) => option.value === defaultValue)
    ) {
      setSelectedValue(options.find((option) => option.value === defaultValue));
    }
  }, [defaultValue, options]);

  const handleChange = (selectedOption) => {
    setSelectedValue(selectedOption);
    onChange(selectedOption);
  };
  return (
    <div>
      <Select
        styles={{
          control: (base) => ({
            ...base,
            width: "100%",
            height: "50px",
            borderRadius: "7px",
            border: "1px solid #2690d0",
          }),
          // control: (baseStyles, state) => ({
          //   ...baseStyles,
          //   width: state ? "100%" : "",
          //   border: state ? "0px" : "0px",
          //   border: state.isFocused ? "0px" : "0px",
          // }),
        }}
        // className={`form-select fs-3`}
        isSearchable
        options={options}
        components={{ MenuList, IndicatorSeparator: () => null }}
        onChange={handleChange}
        name={name}
        placeholder={placeholder}
        value={selectedValue}
      />
    </div>
  );
};

export default ReactSelect;

const height = 35;

class MenuList extends Component {
  render() {
    const { options, children, maxHeight, getValue } = this.props;
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    return (
      <List
        height={maxHeight}
        itemCount={children.length}
        itemSize={height}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  }
}
