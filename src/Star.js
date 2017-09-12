import React, { Component } from 'react'
import PropTypes from 'prop-types'


/**
* @description Represents a star - usually used as part of a collection withihn a Rater component
* @constructor
*/
class Star extends Component {
	static propTypes = {
		value: PropTypes.number.isRequired,
		active: PropTypes.bool.isRequired,
		rate: PropTypes.func.isRequired,
		onHover: PropTypes.func.isRequired,
		onUnhover: PropTypes.func.isRequired,
	}


	/**
	* @description renders a Star component
	* @description evaluates the active prop to determine the star character to be displayed
	* @description and the css classes to apply to the span element which encloses the star
	* @description calls relevant parent component functions when the user hover, clicks, etc
	*/
	render() {
		const {value, rate, onHover, onUnhover, active} = this.props
		const classes = active ? 'star star-selected' : 'star'
		const char = active ? '★' : '☆'

		return (
				<span
					className={classes}
					onClick={(e) => rate(value)}
					onMouseEnter={(e) => onHover(value)}
					onMouseLeave={(e) => onUnhover()}
				>{char}</span>
	  )
	}
}


export default Star
