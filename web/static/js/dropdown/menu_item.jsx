import React from "react";
import { Link } from "react-router";


class MenuItem extends React.Component {
  constructor(props) {
    super(props)

    this.getUrl = this.getUrl.bind(this);
  }

  getUrl(item) {
    return `/${item.type}/${item.slug}/${item.id}`
  }

  render() {
    return (
      <Link className="public-nav-link" to={this.getUrl(this.props.item)}>
        <li>{this.props.item.title}</li>
      </Link>
    )
  }
}

export default MenuItem;
