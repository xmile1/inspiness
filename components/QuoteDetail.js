import React, {Component} from 'react';
import { View, Image, AsyncStorage} from 'react-native';
import { Icon, Text, Button} from 'native-base';
import style from './../style/Styles';

const QuotePlainText = (text) => {
	return text
			.replace(/<[^>]+>/gm, '')
			.replace(/&nbsp;/g, ' ')
			.replace(/&rsquo;/, '\'')
			.replace(/(&ldquo;)|(&rdquo;)/g, '"')
			.trim();
}

const QuoteImage = (img) => {
	//use small img 300*300
	const imageExtension = img.slice(-4);
	return img.split(imageExtension)[0] +'-300x300'+ imageExtension;
}

const themeStyle = (theme) => {
	switch(theme) {
		case 'spirituality':
			return style.spirituality
			break;
		case 'military':
			return style.military
			break;
		case 'politic':
			return style.politic
			break;
		case 'tech':
			return style.tech
			break;
		default:
			return style.theme
			break;
	}
}
//deleteAll is for Test
const deleteAll = async() => {
	const value = await AsyncStorage.removeItem('quoteDB');
}

const saveQuote = async(quote) => {
	console.log('quoteId : ' ,quote.id);

	const info = [{
		id: quote.id,
		thumbnail: quote.thumbnail,
		title: quote.title.rendered,
		text: QuotePlainText(quote.content.rendered),
		author: quote.author
	}];

	try {
		//await AsyncStorage.setItem('quoteDB', null);
		const quoteStore = await AsyncStorage.getItem('quoteDB');
		if (quoteStore !== null){
			// We have data merge object!!
			quoteStore = JSON.parse(quoteStore);
			console.log('quoteDB have data !');
			const checkQuote = quoteStore.find(quoteDB => quoteDB.id === quote.id);
			console.log('checkQuote type'+checkQuote);
			if(checkQuote === undefined) {
				//the quote is not in favoris, so Add it in favoris
				quoteStore = [...quoteStore, ...info];
				console.log('add the new quote => favoris');
				console.table(quoteStore);
				await AsyncStorage.setItem('quoteDB', JSON.stringify(quoteStore));
			} else {
				console.log('already in favoris');
				console.table(quoteStore);
				return false;
			}
		} else {
			// We don't have data, just save it!!
			console.log('quoteDB is empty ! ');
			await AsyncStorage.setItem('quoteDB', JSON.stringify(info));
		}
	} catch (error) {
		// Error saving data
		console.log('asyncStorage ', error);
	}
}

const QuoteDetail = ({quote}) =>  {
	return(
		<View style={[ style.quoteContainer , themeStyle(quote.theme)]}>
			<Image source={{ uri: QuoteImage(quote.thumbnail) }} style={style.thumbnail}/>
			<Text style={style.quoteTitle}>{quote.title.rendered}</Text>
			<Text style={style.quoteText}>{QuotePlainText(quote.content.rendered)}</Text>
			<View style={{ marginTop: 10, alignItems: 'center'}}>
				<Button
				rounded
				dark
				style={{ margin: 20}}
				onPress={() => saveQuote(quote)}
				>
					<Text>SAVE</Text>
				</Button>
			</View>
			<Text style={style.quoteAuthor}> ─ {quote.author} ─ </Text>
		</View>
	);
};

export default QuoteDetail;
