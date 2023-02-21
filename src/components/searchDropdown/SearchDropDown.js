import React, { useEffect, useState } from "react";
import { Dropdown, FormControl } from "react-bootstrap";
import "./SearchDropdown.css";
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    {/* &#x25bc; */}
  </a>
));

// forwardRef again here!
// Dropdown needs access to the DOM of the Menu to measure it
const CustomMenu = React.forwardRef(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    const [value, setValue] = useState('');
    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <FormControl
          autoFocus
          className="customSearch mb-2"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled mb-0">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value),
          )}
        </ul>
      </div>
    );
  },
);



const SearchableDropdown = ({ options, selected, changeHandler, placeholder = "Select", className }) => {
  const [selectedValue, setSelectedValue] = useState('');
  useEffect(() => {
    if (selected) {
      let value = options.find((data) => { if (data.id == selected) { return data.name } })
      setSelectedValue(value.name)
    }

  }, [options, selected])
  const handleChange = (e) => {
    const { id, name } = e.target;
    changeHandler(parseInt(id))
    setSelectedValue(name)
  }
  return (
    <Dropdown className={className} >
      <Dropdown.Toggle as={CustomToggle}>
        {selectedValue || placeholder}
      </Dropdown.Toggle>

    <Dropdown.Menu as={CustomMenu}>
   {options && options.map(option => <Dropdown.Item key={option.id + option.name} eventKey="1" id={option.id} name={option.name} onClick={handleChange}>{option.name}</Dropdown.Item>)}
    </Dropdown.Menu>
  </Dropdown>
)
}
export default SearchableDropdown


