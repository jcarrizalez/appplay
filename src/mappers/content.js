import {logger} from 'services' 
import mapperPerson from '~/mappers/person'

export default (type, data) => {

	try {
		let anio = data.aired_from??''
		let uuid = data.uuid??''
		let title = data.title??''
		let rating = data.rating.name_short??''
		let description1 = data.summary_short??''
		let description2 = data.summary_full??''
		let watchlater = data.status.watchlater??false
		let progress = data.status.progress??0

		let imdb = data.imdb_rating??100
		imdb = (imdb/100).toFixed(1)

		//console.log(data.tags)

		let duration = secondsToString(data.runtime)

		anio = (anio.indexOf('-')!== -1)?(anio.split('-')[0]): ''
	      	
		let portrait = data.images.find(item => item.type_name === 'content_boxart')
		portrait = portrait? portrait.source : null
		
		let landscape = data.images.find(item => item.type_name ==='content_boxart_highlight')
		landscape = landscape? landscape.source : null
		
		let fanarts = data.images.filter(item => item.type_name ==='content_fanart')
		fanarts = fanarts? fanarts : []
		fanarts = fanarts.map(item => item.source)

		let countries = data.countries

		let actors = mapperPerson(data.actors)

		let directors = mapperPerson(data.directors)

		let tags = data.tags.map(({name, slug}) => {
			return {name, slug}
		})

		let genres = data.genres.map(({name, slug}) => {
			return {name, slug}
		})

		if(type==='short'){
			return {
				uuid,
				imdb,
				anio,
				title,
				rating,
				duration,
				portrait,
				landscape,
				fanarts,
				watchlater,
				progress,
				description:description1
			}
		}

		return {
			uuid,
			imdb,
			anio,
			title,
			rating,
			duration,
			portrait,
			landscape,
			fanarts,
			watchlater,
			progress,
			description1,
			description2,
			tags,
			actors,
			countries,
			genres,
			directors,
		}
	} catch (error) {
		return logger.error('mappers/content')
	}
}

function secondsToString(minute) {
	var seconds = Math.floor(minute*60);

	var hour = Math.floor(seconds / 3600);
	//hour = (hour < 10)? '0' + hour : hour;
	var minute = Math.floor((seconds / 60) % 60);
	minute = (minute < 10)? '0' + minute : minute;
	var second = seconds % 60;
	second = (second < 10)? '0' + second : second;

	var response=''

	response = (hour>0)? `${hour}h` : ``

	response = (minute>0)? `${response}${minute} min` : response

	return response
	return hour + ':' + minute + ':' + second;
}
