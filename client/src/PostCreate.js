import { useState } from 'react'
import axios from 'axios'
import Nav from './Nav';

const PostCreate = () => {
    const [state, setState] = useState({
        title: '',
        content: '',
        user: ''
    });

    // Destructure values.
    const {title, content, user} = state

    // Onchange event handler.
    const handleChange = (name) => (event) => {
        // console.log('name', name, 'event', event.target.value);
        setState({ ...state, [name]: event.target.value })
    }

    const handleSubmit = event => {
        event.preventDefault()
        // console.log('title', title, 'user', user, 'content', content)
        axios.post(`${process.env.REACT_APP_API}/create`, { title, content, user })
        .then(response => {
            // Empty the State.
            console.log(response)
            setState({...state, title: '', content: '', user: ''})
            alert(`A new post titled ${response.data.title} created!`)
        })
        .catch(error => {
            alert(error.response.data.error)
        })
    }

    return (
      <div className="container pb-5">
        <Nav />
        <br/>
        <h1>Create post</h1>
        <hr />
        {JSON.stringify(state)}
        <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
                <label className="text-muted">Title</label>
                <input onChange={handleChange('title')} value={title} type="text" className="form-control" placeholder="Post title" required />
            </div>
            <div className="form-group mb-3">
                <label className="text-muted">Content</label>
                <textarea onChange={handleChange('content')} value={content} type="text" className="form-control" placeholder="Write some content" />
            </div>
            <div className="form-group mb-3">
                <label className="text-muted">User</label>
                <input onChange={handleChange('user')} value={user} type="text" className="form-control" placeholder="Your name" required />
            </div>
            <div>
                <button className="btn btn-primary">Create</button>
            </div>
        </form>
      </div>
    );
  };
  
  export default PostCreate;
  