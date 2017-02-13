import React from "react";

import MenuItem from './menu_item';


class Dropdown extends React.Component {
  render() {
    return (
      <div className="public-nav-dropdown">
        <ul>
        {this.props.items.map(function(item, i) {
          return (
            <MenuItem item={item} key={item.title} />
          );
        })}
        </ul>
      </div>
    )
  }
}

export default Dropdown;
