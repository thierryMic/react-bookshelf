import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Star from './Star'


/**
* @description Represents a rater - a row of 5 star characters that allow the user to rate a book
* @constructor
*/
class Rater extends Component {

	static propTypes = {
		rating: PropTypes.number.isRequired,
		onChangeRating: PropTypes.func.isRequired
	}

	/**
	* @description updates the rating of a book and calls the parent component's change function
	* @param {integer} rating - the rating of the book or the number of stars to activate
	*/
  activateStars = (rating) => {
		const {stars} = this.state
		let newStars = Object.assign([], stars)

		newStars.forEach((star) => {
			star.active = star.value <= rating
		})

		this.setState({stars:newStars})
  }


	/**
	* @description temporarily highlights a number of stars where the user is hovering
	* @param {integer} rating - the number of stars to temporarily activate
	*/
	hover = (rating) => {
		this.activateStars(rating)
  }


	/**
	* @description resets the number of highlighted to stars to the current rating
	*/
	unhover = () => {
		this.activateStars(this.state.rating)
  }


	/**
	* @description calls the parent component's rating method
	* @description sets the state of this component
	* @param {integer} rating - the rating of the book
	*/
  rate = (rating) => {
  	this.props.onChangeRating(rating)
  	this.setState({rating})
  }


	/**
	* @description stars- is an array of star objects
	* @description rating - is the current rating of a book
	*/
  state = {
    stars:[],
    rating:0
  }


	/**
	* @description initialises the state
	*/
  componentDidMount() {
      const stars = []

      for (let i = 1; i < 6; i++) {
      	let isActive = i <= this.props.rating
      	stars.push({value: i, active:isActive})
      }

      this.setState({stars:stars, rating:this.props.rating})
  }

	/**
	* @description renders a Rater component
	*/
	render() {
		const {stars} = this.state
		return (
			<div className='rating'>
				{stars.map((star) =>
					<Star
						key={star.value}
						active={star.active}
						value={star.value}
						onHover={this.hover}
						onUnhover={this.unhover}
						rate={this.rate}
					/>
				)}
			</div>
	  )
	}
}


export default Rater
