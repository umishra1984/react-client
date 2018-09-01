import React, { Component } from "react";
import { graphql, compose } from "react-apollo";
import {
  getAuthorsQuery,
  addPostMutation,
  getPostsQuery
} from "../queries/queries";

class AddPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }
  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    if (data.loading) {
      return <option disabled>Loading authors</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }
  submitForm(e) {
    e.preventDefault();
    // use the addPostMutation
    this.props.addPostMutation({
      variables: {
        title: this.state.title,
        tags: this.state.tags,
        authorId: this.state.authorId
      },
      refetchQueries: [{ query: getPostsQuery }]
    });
  }
  render() {
    return (
      <form id="add-post" onSubmit={this.submitForm.bind(this)}>
        <div className="field">
          <label>Post title:</label>
          <input
            type="text"
            onChange={e => this.setState({ title: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Tags:</label>
          <input
            type="text"
            onChange={e => this.setState({ tags: e.target.value })}
          />
        </div>
        <div className="field">
          <label>Author:</label>
          <select onChange={e => this.setState({ authorId: e.target.value })}>
            <option>Select author</option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addPostMutation, { name: "addPostMutation" })
)(AddPost);
