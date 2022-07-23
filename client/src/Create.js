import { useState } from 'react'

const Create = () => {
    // State.
    const [state, setState] = useState({
        title: '',
        content: '',
        user: ''
    });

    // Destructure values.
    const {title, content, user} = state

    // Onchange event handler.
    // const handleChange = (name) => (event) => {
    //     console.log('name', name, 'event', event.target.value);
    //     setState({ ...state, [name]: event.target.value })
    // }

    function handleChange(name) {
        return function(event) {
            setState({ ...state, [name]: event.target.value })
        }
    }

    return (
      <div className="container p-5">
        <h1>Create post</h1>
        <br />
        {JSON.stringify(state)}
        <form>
            <div className="form-group mb-3">
                <label className="text-muted">Title</label>
                <input onChange={handleChange('title')} value={title} type="text" className="form-control" placeholder="Post title" required />
            </div>
            <div className="form-group mb-3">
                <label className="text-muted">Content</label>
                <textarea onChange={handleChange('content')} value={content} type="text" className="form-control" placeholder="Write some content" require />
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
  
  export default Create;
  