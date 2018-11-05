import React, { Component } from "react";
import { withAuth } from "@okta/okta-react";

class Profile extends Component {
  state = { user: null };

  componentDidMount() {
    this.getCurrentUser();
  }

  getCurrentUser = async () => {
    const { auth } = this.props;
    auth.getUser().then((user) => {
      this.setState({ user });
    });
  }

  render() {
    const { user } = this.state;
    if (!user) return null;
    return (
      <section className="user-profile">
        <h1>User Profile</h1>
        <div>
          <p>
            Name:
            {user.name}
          </p>
        </div>
      </section>
    );
  }
}

export default withAuth(Profile);
