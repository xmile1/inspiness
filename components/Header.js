import React, { Component} from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import style from './../style/Styles';

const Header = () => (
	<View style={style.header} >
		<Text style={style.headerText}>
			INSPINESS
		</Text>
	</View>
);

export default Header;