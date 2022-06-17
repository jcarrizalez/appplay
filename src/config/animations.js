export default {
	Marketing: scrollY => animations(scrollY, 550, 85, 100, 300, 1.02),
	ContentDetail: scrollY => animations(scrollY, 250, 55, 10, 100, 1.2),
	ChannelDetail: scrollY => animations(scrollY, 250, 55, 10, 100, 1.2),
}

function animations(scrollY, MAX_HEIGHT, MIN_HEIGHT, inputRange, outputRange, distance)
{
	const HEADER_MAX_HEIGHT = MAX_HEIGHT
	const HEADER_MIN_HEIGHT = MIN_HEIGHT
	const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT

	const headerTranslateY = scrollY.interpolate({
		inputRange: [inputRange, HEADER_SCROLL_DISTANCE],
		outputRange: [0, 0],
		extrapolate: 'clamp',
	});

	const imageOpacity = scrollY.interpolate({
		inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
		outputRange: [1, 0.1, 0],
		extrapolate: 'clamp',
	});

	const headerOpacity = scrollY.interpolate({
		inputRange: [0, HEADER_SCROLL_DISTANCE / distance, HEADER_SCROLL_DISTANCE],
		outputRange: [0, 0, 1],
		extrapolate: 'clamp',
	});

	const actionsOpacity = scrollY.interpolate({
		inputRange: [inputRange, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
		outputRange: [1, 0.1, 0],
		extrapolate: 'clamp',
	});

	const imageTranslateY = scrollY.interpolate({
		inputRange: [0, HEADER_SCROLL_DISTANCE],
		outputRange: [0, outputRange],
		extrapolate: 'clamp',
	});

	const titleScale = scrollY.interpolate({
		inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
		outputRange: [2, 1.5, 1],
		extrapolate: 'clamp',
		});
	const titleTranslateY = scrollY.interpolate({
		inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
		outputRange: [0, 0, -0],
		extrapolate: 'clamp',
	});

	return{
		HEADER_MAX_HEIGHT,
		contentContainerStyle: {paddingTop: HEADER_MAX_HEIGHT - 10},
		headerTranslateY: {transform: [{translateY: headerTranslateY}]},
		imageTranslateY: {/*opacity: imageOpacity, */transform: [{translateY: imageTranslateY}],},
		headerOpacity: {opacity: headerOpacity },
		actionsOpacity: {opacity: actionsOpacity },
		titleTranslateY: {transform: [{scale: titleScale}, {translateY: titleTranslateY}]},
		nativeEvent: [{nativeEvent: {contentOffset: {y: scrollY}}}],
	}
}