import React from "react";
import { Link } from "react-router";


class AdminMenuItem extends React.Component {
  constructor(props) {
    super(props)

    this.getUrl = this.getUrl.bind(this);
  }

  getUrl(item) {
    return `/admin/${item.type}/${item.id}/edit`
  }

  render() {
    return (
      <Link className="private-nav-link" to={this.getUrl(this.props.item)}>
        <li>{this.props.item.title}</li>
      </Link>
    )
  }
}

export default AdminMenuItem;

