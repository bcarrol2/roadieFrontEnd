import React from 'react';

class Popup extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            rating: 1,
            name: '',
            title: '',
            review_text: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({ 
            [e.target.name]: e.target.value 
        });
    }

    handleSubmit(e){
        e.preventDefault();
        const url = "http://localhost:3000/api/v1/reviews/create";
        const { rating, name, title, review_text } = this.state;

        if (name.length === 0 || title.length === 0 || review_text.length === 0)
          return;

        const body = {
          rating,
          name,
          title,
          review_text
        };
        
        const token = document.querySelector('meta[name="csrf-token"]').content;
            fetch(url, {
              method: "POST",
              headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
              },
              body: JSON.stringify(body)
            })
              .then(response => {
                if (response.ok) {
                  return response.json();
                }
                throw new Error("Network response was not ok.");
              })
              .then(window.location.reload())
              .catch(error => console.log(error.message));
    }

    render() {
        return (
            <div className='popup'>
                <div className='popupInner'>
                    <h2 style={{textAlign: 'center', textTransform: 'uppercase'}}><b>Add Review</b></h2>
                    <form onSubmit={this.handleSubmit}>
                            <p style={{ marginBottom: '0'}}>Rating</p>
                            <select name="rating" onChange={this.handleChange} style={{width: '35%'}}>
                                <option value="1">One Star</option>
                                <option value="2">Two Stars</option>
                                <option value="3">Three Stars</option>
                                <option value="4">Four Stars</option>
                                <option value="5">Five Stars</option>
                            </select>
                        <br/>
                        <br/>
                            <p style={{ marginBottom: '0' }}>Your name</p>
                        <input 
                            required
                            name="name" 
                            onChange={this.handleChange} 
                            placeholder="Enter Text Here..." 
                            style={{width: '100%'}} 
                        />
                        <br/>
                        <br/>
                            <p style={{ marginBottom: '0' }}>Review title</p>
                        <input 
                            required
                            name="title" 
                            onChange={this.handleChange} 
                            placeholder="Enter Text Here..." 
                            style={{width: '100%'}} 
                        />
                        <br/>
                        <br/>
                            <p style={{ marginBottom: '0' }}>Write your review below</p>
                        <textarea 
                            required
                            name="review_text" 
                            onChange={this.handleChange} 
                            placeholder="Enter Text Here..." 
                            style={{width: '100%', height: '70px'}}
                        >
                        </textarea>
                        <br/>
                        <br/>
                        <button type="submit" id="darkButton">Submit</button>
                        <button id="lightButton" onClick={this.props.closePopup}>Cancel</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Popup;