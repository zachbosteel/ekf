import React from "react";
import { Link } from "react-router";

import AdminMenuItem from './admin_menu_item';


class AdminDropdown extends React.Component {
  render() {
    return (
      <div className="private-nav-dropdown">
        <ul>
        {this.props.items.map(function(item, i) {
          return (
            <AdminMenuItem item={item} key={item.title} />
          );
        })}
        { this.props.items[0].type === 'static' ? null : <Link className="private-nav-link" to={`/admin/${this.props.menuType}/add`}>
            <li>Add a new page</li>
          </Link>}
        </ul>
      </div>
    )
  }
}

export default AdminDropdown;
