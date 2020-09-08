import React from 'react'
import Icon from 'antd/es/icon'
import {LiskIcon} from "./LiskIcon";
import { FinishIcon } from './FinishIcon';

const custom_types = {
	'lisk': LiskIcon,
	'finish': FinishIcon
}

export const CustomIcon = (props: any) => {
	const isCustom = Object.keys(custom_types).includes(props.type)
	if (isCustom) {
		const CustomIconType = custom_types[props.type]
		return <CustomIconType className={props.className} />
	}
	const type = props.type ? props.type : 'question'
	return <Icon type={type} className={props.className} theme={props.theme} />
}
