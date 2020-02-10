import React from 'react';
import Popup from './Popup';
import { Chart } from "react-google-charts";
import StarRatings from 'react-star-ratings';
import roadieLogo from '../img/Software-Box-Mock-Up.jpg';

export default class Reviews extends React.Component {
    constructor(props){
        super(props)

        this.state = {
            reviews: [],
            reviews_feed: [],
            cart: 0,
            showPopup: false
        }

        this.getData = this.getData.bind(this)
        this.rating5 = this.rating5.bind(this)
        this.rating4 = this.rating4.bind(this)
        this.rating3 = this.rating3.bind(this)
        this.rating2 = this.rating2.bind(this)
        this.rating1 = this.rating1.bind(this)
    }

    componentDidMount(){
        this.getData()
        this.getFeed()
    }
    
    getData () {
        const url = "http://localhost:3000/api/v1/reviews/index";
           fetch(url)
           .then(response => {
             if (response.ok) {
                return response.json();
             }
             throw new Error("There was an error getting the data");
           })
          .then(response => this.setState({ reviews: response }))
          .catch(() => this.props.history.push("/reviews"));
    }

    getFeed(){
        const feedUrl = "http://localhost:3000/api/v1/reviews/reviews_feed"
          fetch(feedUrl)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Error fetching feed")
          })
          .then(response => this.setState({ reviews_feed: response}))
          .catch(() => this.props.history.push("/reviews"))
    }

    togglePopup() {
        this.setState({
            showPopup: !this.state.showPopup
        });
    }

    addToCart = () => {
      this.setState({
        cart: this.state.cart += 1
      })
    }

    rating5(){
      this.setState({
        reviews_feed: this.state.reviews.rating5
      })
    }

    rating4(){
      this.setState({
        reviews_feed: this.state.reviews.rating4
      })
    }

    rating3(){
      this.setState({
        reviews_feed: this.state.reviews.rating3
      })
    }

    rating2(){
      this.setState({
        reviews_feed: this.state.reviews.rating2
      })
    }

    rating1(){
      this.setState({
        reviews_feed: this.state.reviews.rating1
      })
    }

    render(){
        const { reviews, reviews_feed } = this.state;
        console.log(reviews_feed, 'truncked')

        let allReviews = reviews_feed.map((review, index) => (
            <div key={index} id="separateReviewBox">
                <h2><b>{review.title}</b></h2>
                <div style={{float: 'right'}}>
              <StarRatings
                rating={review.rating}
                numberOfStars={5}
                starDimension="20px"
                starSpacing="1px"
                starRatedColor="#D4AF37"
                starHoverColor="#D4AF37"
                starEmptyColor="lightgrey"
                isSelectable={false}
                name='singleRating'
              />
            </div>
              <br/>
                <p style={{ color: 'grey', fontSize: 'smaller' }}>{review.name} on {review.created_at.slice(0, 10)}</p>
                <p>{review.review_text}</p>
            </div>
        ));
    
    const noReview = (
      <div>
        <h4>
          No reviews yet. Why not <a onClick={this.togglePopup.bind(this)} style={{color: 'blue', textDecoration: 'underline'}}>create one</a>
        </h4>
      </div>
    );

    return (
        <div>
            <div id="addToCart">
                Add To Cart({this.state.cart})
            </div>
            <div id="reviewContainer">
              <div style={{float: 'left', margin: '30px'}}>
                <img src={roadieLogo} alt="roadie" style={{height: '450px', width: '400px'}}/>
              </div>
              <div style={{float: 'left', margin: '30px'}}>
              <h3 style={{ textTransform: 'uppercase' }}><b>Roadie Communicator - Includes Installation Software</b></h3>
              <p>by <b>Roadie</b></p>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
                sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <p>
              <li style={{textIndent: '40px'}}>
                Duis aute irure dolor in reprehenderit in voluptate velit 
                esse cillum dolore eu fugiat nulla pariatur.
              </li>
              </p>
              <button id="darkButton" onClick={this.addToCart}>
                <b>Add to cart</b>
              </button>
              <button id="lightButton" onClick={this.togglePopup.bind(this)}> 
              Leave Reaview
              </button>
                  {this.state.showPopup ?
                      <Popup
                          text='Click "Close Button" to hide popup'
                          closePopup={this.togglePopup.bind(this)}
                      />
                      : null
                  }  
              </div>
            </div>
            <div style={{clear: 'both', margin: '30px'}}>
              <h3 style={{ textTransform: 'uppercase' }}><b>Customer Reviews</b></h3>
              <div id="allReviewsBox">
                  <StarRatings
                    rating={this.state.reviews.average_star_rating}
                    numberOfStars={5}
                    starDimension="25px"
                    starSpacing="1px"
                    starRatedColor="#D4AF37"
                    starHoverColor="#D4AF37"
                    starEmptyColor="lightgrey"
                    isSelectable={false}
                    name='overallRating'
                  />
                  <p> {this.state.reviews.average_star_rating} out of 5</p>
                  <div style={{float: 'left'}}>
                  <Chart
                    width={'300px'}
                    height={'300px'}
                    chartType="BarChart"
                    loader={<div>Loading Chart</div>}
                    data={[
                        [
                            'Element',
                            'Density',
                            { role: 'style' },
                            {
                                sourceColumn: 0,
                                role: 'annotation',
                                type: 'string',
                                calc: 'stringify',
                            },
                        ],
                            ['5 star', reviews.rated5_count, '#D4AF37', null],
                            ['4 star', reviews.rated4_count, '#D4AF37', null],
                            ['3 star', reviews.rated3_count, '#D4AF37', null],
                            ['2 star', reviews.rated2_count, '#D4AF37', null],
                            ['1 star', reviews.rated1_count, '#D4AF37', null],
                    ]}
                    options={{
                            title: `${reviews.counted_reviews} reviews`,
                            width: 250,
                            height: 300,
                            bar: { groupWidth: '95%' },
                            legend: { position: 'none' }
                    }}
                        // For tests
                        rootProps={{ 'data-testid': '6' }}
                  />
                  </div>
                  <div style={{float: 'left'}}>
                    <h3>Filter Reviews</h3>
                    <a href="http://localhost:3001/reviews">All ratings</a>
                    <br/>
                    <a href="javascript:;" onClick={this.rating5}>5 stars</a>
                    <br/>
                    <a href="javascript:;" onClick={this.rating4} >4 stars</a>
                    <br/>
                    <a href="javascript:;" onClick={this.rating3} >3 stars</a>
                    <br/>
                    <a href="javascript:;" onClick={this.rating2} >2 stars</a>
                    <br/>
                    <a href="javascript:;" onClick={this.rating1} >1 stars</a>
                    <br/>
                  </div>
              </div>
              <div id="singleReviewsContainer">
                  {reviews_feed.length > 0 ? allReviews : noReview}
              </div>
            </div>
        </div>
            );
    }
}