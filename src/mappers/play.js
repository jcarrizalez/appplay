import {logger, audios} from 'lib'
import mapperContent from '~/mappers/content'
import {TextTrackType} from 'react-native-video'

export default (response) =>
{
	try {

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

	   var {uuid, title, duration,rating, portrait, landscape, fanarts} = mapperContent('full', content)

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
               index: 0,
               title: subt_array.name,
               language: subt_array.slug,
               type: TextTrackType.VTT, // TextTrackType.SRT
               uri: cdn.vtt
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
		return {
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
			//landscape,
			progress,
			android:{
				source:{
					isNetwork: true,
					uri:cdn.dash,
					headers:{},
					//headers:{'x-ms-version': '2019-02-02',},
					//type: 'mpd'
				},
				audios: audios_,
				subtitles,
            textTracks: subtitles,
            selectedTextTrack,
            selectedAudioTrack
			},
			ios:{
				source:{
					isNetwork: true,
					uri:cdn.hls,
					headers:{},
					//type: 'mpd'
				},
				audios: audios_,
				subtitles,
            textTracks: undefined,
            selectedTextTrack,
            selectedAudioTrack
			}
		}
	} catch (error) {
		return logger.error('mappers/play')
	}
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