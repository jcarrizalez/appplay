import {logger} from 'lib'
import mapperContent from '~/mappers/content'
export default block =>
{
	try {
		var {id, logged, data:{elements, metadata},metadata:{uuid, description, images, title} } = block

		let img_home = images.find(item => item.type_name === 'content_boxart_highlight')
		img_home = img_home? img_home.source : null
		
		let img_detail = images.find(item => item.type_name === 'content_fanart')
		img_detail = img_detail? img_detail.source : null

		elements = elements.map( content => mapperContent('short', content))
		
		return {
			type:'channel',
			id,
			uuid,
			description,
			title,
			img_home,
			img_detail,
			elements,
			metadata
		}
	} catch (error) {
		return logger.error('mappers/channel_block')
	}
}
//https://api.stage.qubit.tv/marketing/block/channel/2c3a7c4c-0ff0-4d22-b46d-9aa03c8e447b_CanalMyFFF2022?page=1&count=20