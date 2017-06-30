import React, {Component} from 'react';
import { View, Image, AsyncStorage, ScrollView } from 'react-native';
import { Button, Icon, Text } from 'native-base';
import style from './../style/Styles';

class Favoris extends Component {
	state = {favoris: null}

	refresh = async() => {
		try {
			let value = await AsyncStorage.getItem('quoteDB');
			let listOfTasks = await JSON.parse(value) || [];
			if (value !== null){
				// if favoris exist
				console.log('value: '+ typeof listOfTasks);
				this.setState({favoris: listOfTasks})
			}
		} catch (error) {
		  console.log(error);
		}
	}

	deleteQuote = async(quote) => {
		try {
			const quoteStore = await AsyncStorage.getItem('quoteDB');
			quoteStore = JSON.parse(quoteStore);
			const index = quoteStore.findIndex(quoteDB => quoteDB.id === quote.id);
			quoteStore = [...quoteStore.slice(0, index), ...quoteStore.slice(index + 1)];
			console.log('remove quote => ',quote.id);
			console.table(quoteStore);
			await AsyncStorage.setItem('quoteDB', JSON.stringify(quoteStore));
			this.refresh();
		} catch(e) {
			console.log('Remove quote problem' + e);
		}
	}

	renderQuotes() {
		return this.state.favoris.map((quote) => {
			return (
				<View key={quote.id} style={style.favorisQuote}>
					<Text>{quote.author}</Text>
					<Text>{quote.text}</Text>
					<Button rounded dark onPress={() => this.deleteQuote(quote)}>
						<Text>Delete</Text>
					</Button>
				</View>
			);
		})
	}

	loadText = () => {
		if(this.state.favoris !== null && this.state.favoris.length > 0) {
			console.log(this.state.favoris.length);
			return(
				<ScrollView>
					{this.renderQuotes()}
				</ScrollView>
			)
		} else if(this.state.favoris !== null && this.state.favoris.length < 1) {
			return(
				<Text>You have not favorites</Text>
			);
		} else {
			return(
				<Text>You have not favorites</Text>
			);
		}
	}

	render() {
		return (
		<View style={style.container}>
			<Button onPress={() => this.refresh()}>
				<Text>Refresh</Text>
			</Button>

			{this.loadText()}

		</View>

		);
	}
}

export default Favoris;