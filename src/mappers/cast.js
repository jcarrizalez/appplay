import {logger, audios} from 'lib'
import mapperContent from '~/mappers/content'
import {TextTrackType} from 'react-native-video'

export default (response) =>
{
	
		var {cdn, 
			playback:{
				id,
				content
			}, 
			status:{
				progress,
            language,
            subtitle
			},
		} = response

		var {
	      title_original, 
	      time_start, 
	      time_finish, 
	      subtitle_tracks,
	      audio_default,
	      audio_tracks,
	      runtime,
	   } = content

      const audio_is_array = Array.isArray(audio_tracks)

	   var {uuid, title, description1, duration,rating, portrait, landscape, fanarts} = mapperContent('full', content)

		const poster = fanarts[Math.floor(Math.random() * fanarts.length)]

      //######### SELECT SUBTITLE
      var subt_selec = audios.find(item => item.slug === subtitle)

      var selectedTextTrack = subt_selec
         ?  {
              type: 'index',
              value: 0
            }
         : undefined

      //######### LISTA DE SUBTITLES
		var subt_array = audios.find(item => item.slug === subtitle_tracks)
      var subtitles = subt_array
         ?  [{
               id: 1, // assign a unique numeric ID
					type: 'text',
					subtype: 'subtitles',
					name: subt_array.name,
					contentId: cdn.vtt,
					language: subt_array.slug,
            }]
         : undefined

      //######### SELECT AUDIO
      var audio_selec = audios.find(item => item.slug === language)

      var audio_default = (audio_is_array && audio_tracks.length>0)
         ?  {
               type: "language",
               value: audio_tracks[0]
            }
         : undefined

      audio_selec = audio_selec
         ?  {
               type: "language",
               value: language
            }
         : audio_default

      //######### LIST AUDIOS

		var audios_ = audio_is_array
   		? audio_tracks
            .map(audio => audios.find(item => item.slug === audio))
            .filter(item => item!== undefined)
   		: undefined

   	var cont = subtitles? 1 : 0
   	
   	audios_ = audios_? audios_.map(item => { 
   		let contentId =`trk000${cont}`
   		cont = (cont + 1)
   		return {
   			id: cont,
				type: 'audio',
				name: item.name,
				//contentId: cdn.dash,
				language: item.slug,
   		}
   	}) : undefined

      var selectedAudioTrack = (audio_is_array && audios_.length ===1)
         ? undefined
         : audio_selec
      /*
         console.log('status', response.status)
         console.log('audio_tracks', audio_tracks)
         console.log('language', language)
         console.log('subt_selec', subtitle)
         console.log('subtitle', subtitle)
         console.log('audio_selec', audio_selec)

         return
      */

		let data = {
			id,
			uuid,
			title,
			title_original,
			time_start, 
			time_finish, 
			poster,
			duration,
			rating, 
			portrait, 
			landscape,
			progress,
			/*
			loadMedia2:{
	        	autoplay: true,
	        	preloadTime: 8.0,
	         mediaInfo: {
	         contentUrl: cdn.dash,
	         //contentUrl: cdn.dash'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4',
	            
	        },
	      },
	      */
	      loadMedia:{
	       	autoplay: true,
	       	preloadTime: 8.0,
	       	mediaInfo: {
		         contentUrl: cdn.dash,
		         //mediaTracks: [englishSubtitle, frenchSubtitle, frenchAudio],
		         //mediaTracks: subtitles.concat(audios_),
		         mediaTracks: subtitles,
		         contentType: 'video/mp4',
	          	metadata: {
		            images: [
		              	{
		               	url:landscape
		             	},
		            ],
		            title: title,
		            subtitle: description1,
		            studio: `Qubit`,
		            type: 'movie',
		          },
		         streamDuration: ((runtime??0) * 60), // seconds
	        	},
	        	startTime: progress??0, // seconds
	        	//startTime: 1600, // seconds
	      },
			/*
	      loadMedia:{
	        mediaInfo: {
	          contentUrl:
	            'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4',
	          contentType: 'video/mp4',
	          metadata: {
	            images: [
	              {
	                url:
	                  'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/images/480x270/BigBuckBunny.jpg',
	              },
	            ],
	            title: 'Big Buck Bunny',
	            subtitle:
	              'A large and lovable rabbit deals with three tiny bullies, led by a flying squirrel, who are determined to squelch his happiness.',
	            studio: 'Blender Foundation',
	            type: 'movie',
	          },
	          streamDuration: 596, // seconds
	        },
	        startTime: 10, // seconds
	      },
	      */
		}
		return data
		console.log(data)
		/*
	try {
		return data
	} catch (error) {
		return logger.error('mappers/cast')
	}
	*/
}

/*

const englishSubtitle = {
  id: 1, // assign a unique numeric ID
  type: 'text',
  subtype: 'subtitles',
  name: 'English Subtitle',
  contentId: 'https://some-url/caption_en.vtt',
  language: 'en-US',
}

const frenchSubtitle = {
  id: 2,
  type: 'text',
  subtype: 'subtitles',
  name: 'French Subtitle',
  contentId: 'https://some-url/caption_fr.vtt',
  language: 'fr',
}

const frenchAudio = {
  id: 3,
  type: 'audio',
  name: 'French Audio',
  contentId: 'trk0001',
  language: 'fr',
}

*/