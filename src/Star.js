import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Star extends Component {
	static propTypes = {
		onHover: PropTypes.func.isRequired,
	}


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
