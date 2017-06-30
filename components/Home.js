import React, {Component} from 'react';
import { View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Container, Content, Footer, FooterTab, Button, Icon, Text } from 'native-base';
import axios from 'axios';
import style from './../style/Styles';
import QuoteDetail from './QuoteDetail';

const urlApi = 'http://polarfront.fr/wp-json/wp/v2/quotes';



class Home extends Component {
	state = { quotes : [], isLoading: true };

	componentWillMount() {
		axios.get(urlApi)
			.then((response) => {
				console.log(response.data);
				this.setState({quotes: response.data, isLoading: false });
			})
			.catch((e) => {
				console.log(e);
			});
	}

	loaderDisplay() {
		if(this.state.isLoading) {
			return <ActivityIndicator style={style.spinner} color="#FF520F" size="large"/>
		} else {
			return null;
		}
	}

	renderHtmlText(text) {
		return text
			.replace(/<[^>]+>/gm, '')
			.replace(/&nbsp;/g, ' ')
			.replace(/&rsquo;/, '\'')
			.replace(/(&ldquo;)|(&rdquo;)/g, '"');
	}

	renderQuotes() {
		return this.state.quotes.map((quote) => {
				return(
					<QuoteDetail key={quote.id} quote={quote}/>
				);
			})
	}

	render() {
		return (
			<View>
				<View >
					{this.loaderDisplay()}
				</View>
				<ScrollView>
					{this.renderQuotes()}
				</ScrollView>
			</View>
		);
	}
}

export default Home;