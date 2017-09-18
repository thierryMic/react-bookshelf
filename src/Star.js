import React from 'react'
import PropTypes from 'prop-types'


/**
* @description Represents a star - usually used as part of a collection withihn a Rater component
* @description evaluates the active prop to determine the star character to be displayed
* @description and the css classes to apply to the span element which encloses the star
* @description calls relevant parent component functions when the user hover, clicks, etc
*/
const Star = (props) => {
	const {value, rate, onHover, onUnhover, active} = props
	return (
			<span
				className={active ? 'star star-selected' : 'star'}
				onClick={(e) => rate(value)}
				onMouseEnter={(e) => onHover(value)}
				onMouseLeave={(e) => onUnhover()}
			>{active ? '★' : '☆'}</span>
  )
}

Star.propTypes = {
		value: PropTypes.number.isRequired,
		active: PropTypes.bool.isRequired,
		rate: PropTypes.func.isRequired,
		onHover: PropTypes.func.isRequired,
		onUnhover: PropTypes.func.isRequired,
}

export default Star
