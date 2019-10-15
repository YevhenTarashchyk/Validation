import React, { Component } from "react";

import "./Autocomplete.css";

class Autocomplete extends Component {
  state = {
    value: "",
    visible: false,
    hoveredOptionIndex: null,
    maxVisibleOptions: 5,
    optionsHeight: 50
  };

  componentDidMount() {
    const { maxVisibleOptions, optionsHeight, value } = this.props;
    if (!maxVisibleOptions && !optionsHeight && !value) return;
    maxVisibleOptions &&
      this.setState({
        maxVisibleOptions
      });
    optionsHeight &&
      this.setState({
        optionsHeight
      });
    value &&
      this.setState({
        value
      });
  }

  handleBlurParent = e => {
    if (!e.relatedTarget) {
      this.setState({
        visible: false
      });
    }
  };

  handleTabKeyDown = (options, e) => {
    const { hoveredOptionIndex, value } = this.state;
    if (value && hoveredOptionIndex !== null) {
      e.preventDefault();
      this.handleClickOption(e, options[hoveredOptionIndex]);
    }
  };

  handleOptionHover = (optionsLength, hoveredOptionIndex, down) => {
    if (
      !this.autocompleteSelectorRef ||
      !this.autocompleteSelectorRef.scrollHeight
    ) {
      return null;
    }

    const { optionsHeight, maxVisibleOptions } = this.state;
    const firstVisibleOptionPosition =
      this.autocompleteSelectorRef.scrollTop / optionsHeight;
    const lastVisibleOptionPosition =
      firstVisibleOptionPosition + maxVisibleOptions - 1;

    let newHoveredOptionIndex = hoveredOptionIndex;
    if (down) {
      if (
        optionsLength - 1 > newHoveredOptionIndex &&
        newHoveredOptionIndex !== null
      ) {
        if (!(newHoveredOptionIndex < lastVisibleOptionPosition)) {
          this.autocompleteSelectorRef.scrollTop += optionsHeight;
        }
        newHoveredOptionIndex++;
      } else {
        newHoveredOptionIndex = 0;
        this.autocompleteSelectorRef.scrollTop = 0;
      }
    } else {
      if (newHoveredOptionIndex) {
        if (!(newHoveredOptionIndex > firstVisibleOptionPosition)) {
          this.autocompleteSelectorRef.scrollTop -= optionsHeight;
        }
        newHoveredOptionIndex--;
      } else {
        newHoveredOptionIndex = optionsLength - 1;
        this.autocompleteSelectorRef.scrollTop = this.autocompleteSelectorRef.scrollHeight;
      }
    }
    this.setState({
      hoveredOptionIndex: newHoveredOptionIndex
    });
  };

  getFilteredOptions = () => {
    const { options } = this.props;
    const { value } = this.state;
    if (!options || !value) return null;
    return options
      .filter(
        opt => opt.substr(0, value.length).toLowerCase() === value.toLowerCase()
      )
      .sort();
  };

  renderOptions = filteredOptions => {
    const {
      value,
      visible,
      hoveredOptionIndex,
      optionsHeight,
      maxVisibleOptions
    } = this.state;
    if (!value || !visible || !filteredOptions || !filteredOptions.length)
      return null;

    const { style = {}, classNames = {} } = this.props;

    const maxHeight = maxVisibleOptions * optionsHeight;
    const selectorStyles = {
      ...style.autocompleteSelector,
      maxHeight: maxHeight + "px"
    };
    const optionsStyles = {
      ...style.autocompleteSelectorOptions,
      height: optionsHeight + "px"
    };

    return (
      <div
        style={selectorStyles}
        className="autocomplete-selector"
        ref={element => (this.autocompleteSelectorRef = element)}
      >
        {filteredOptions.map((option, index) => (
          <div
            key={index}
            style={optionsStyles}
            className={`${
              hoveredOptionIndex === index ? "active" : ""
            } autocomplete-option`}
            onClick={e => this.handleClickOption(e, option)}
            tabIndex="-1"
            ref={element => {
              this[`optionRef${index}`] = element;
            }}
          >
            <span
              style={style.highlight}
              className={`${classNames &&
                classNames.highlight &&
                classNames.highlight}`}
            >
              {option.substr(0, value.length)}
            </span>
            <span>{option.substr(value.length)}</span>
          </div>
        ))}
      </div>
    );
  };

  handleClickOption = (e, option) => {
    const { onChoose } = this.props;
    this.setState({
      value: option,
      visible: false,
      hoveredOptionIndex: null
    });
    this.autocompleteInputRef.focus();
    onChoose && onChoose(option);
  };

  handleChangeInput = e => {
    const { onChange } = this.props;
    this.setState({
      value: e.target.value,
      visible: true
    });
    onChange && onChange(e);
  };

  handleKeyDownInput = options => e => {
    const { hoveredOptionIndex } = this.state;

    if (!options) return null;

    switch (e.key) {
      case "ArrowDown":
        this.handleOptionHover(options.length, hoveredOptionIndex, true);
        break;

      case "ArrowUp":
        this.handleOptionHover(options.length, hoveredOptionIndex, false);
        break;

      case "Enter":
        hoveredOptionIndex !== null &&
          this.handleClickOption(e, options[hoveredOptionIndex]);
        break;

      case "Tab":
        this.handleTabKeyDown(options, e);
        break;

      default:
        return null;
    }
  };

  render() {
    const { onFocus, style = {} } = this.props;
    const { value } = this.state;
    const wrapperStyle = { ...style.autocompleteWrapper };
    const inputStyle = { ...style.autocompleteInput };
    const filteredOptions = this.getFilteredOptions();
    return (
      <div
        className="autocomplete-wrapper"
        onBlur={this.handleBlurParent}
        style={wrapperStyle}
      >
        <input
          placeholder="Country"
          value={value}
          type="text"
          id="autocomplete"
          className={
            this.renderOptions(filteredOptions) ? "input--active" : null
          }
          style={inputStyle}
          onChange={this.handleChangeInput}
          onFocus={onFocus && onFocus}
          onKeyDown={this.handleKeyDownInput(filteredOptions)}
          ref={element => (this.autocompleteInputRef = element)}
        />

        {this.renderOptions(filteredOptions)}
      </div>
    );
  }
}

export default Autocomplete;
