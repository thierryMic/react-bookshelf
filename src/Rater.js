import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Star from './Star'
// https://codepen.io/jamesbarnett/pen/vlpkh?editors=1100

/**
* @description Represents a shelfer - a dropdown menu do select the status of a book object
* @constructor
*/
class Rater extends Component {

	changeRating = (e) => {
    const rating = e.target.value
  }

  activateStars = (rating) => {
		const {stars} = this.state
		let newStars = Object.assign([], stars)

		newStars.map((star) => {
			star.active = star.value <= rating
		})
		this.setState({stars:newStars})
  }

	hover = (rating) => {
		this.activateStars(rating)
  }

	unhover = () => {
		this.activateStars(this.state.rating)
  }

  rate = (rating) => {
  	this.props.onChangeRating(rating)
  	this.setState({rating})
  }

  state = {
    stars:[],
    rating:0
  }

  componentDidMount() {
      const stars = []

      for (let i = 1; i < 6; i++) {
      	let isActive = i <= this.props.rating
      	stars.push({active:false, value: i, active:isActive})
      }

      this.setState({stars:stars, rating:this.props.rating})
  }


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
