import React, { useContext } from 'react'
import Select from 'react-select'

const SearchBar = (props) => {

  const styleLabelText = (s) => {
    const arr = s.split(" ");
    for (var i = 0; i < arr.length; i++)
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    const modifiedStr = arr.join(" ");
    return modifiedStr;
  }

  let defaultList = props.defaultVal;
  let searchList = props.searchList;

  // if shouldIgnoreUser false is set to true, ignore a particular user from display
  if (props.shouldIgnoreUser) {
    const ignoreUser = { "_id": props.ignoreUser }
    defaultList = defaultList.filter((e) => e._id != ignoreUser._id);
    searchList = searchList.filter((e) => e._id != ignoreUser._id);
  }

  return (
    <Select
      defaultValue={defaultList}
      isMulti={props.isMulti}
      getOptionLabel={x => styleLabelText(x.firstName + " " + x.lastName)}
      getOptionValue={x => x._id}
      options={searchList}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={props.onChangeHandler}
      isClearable={false}
      placeholder={props.placeHolderText}
      isDisabled={props.disableSelect}
    />
  )
}


export default SearchBar;
