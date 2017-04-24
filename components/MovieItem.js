import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
	StyleSheet,
	TouchableHighlight
} from 'react-native';

class MovieItem extends Component {
	constructor(props) {
    super(props);
  }

  handleNextPress = (nextObj) => {
    this.props.navigator.push(nextObj);
  };

	render() {
		var posterView = this.props.poster == 'N/A' ?  <Image style={styles.posterView} source={require('./../images/noimage.png')} />:<Image style={styles.posterView} source={{uri: this.props.poster}} />
    const configMovieDetails= {
        id: 1,
        title : this.props.title,
        passProps : {
          'imdbID' : this.props.imdbID
        }
    };

		return (
      <TouchableHighlight underlayColor="transparent" onPress={() => this.handleNextPress(configMovieDetails)}>
        <View style={styles.container}>
          {posterView}
          <View>
            <Text style={styles.headerText}>{this.props.title}</Text>
            <Text style={styles.rowText}>{this.props.year}</Text>
            <Text style={styles.rowText}>{this.props.type}</Text>
          </View>
        </View>
      </TouchableHighlight>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginBottom: 5,
		flexDirection:'row',
		backgroundColor: '#DCDCDC'
  },
	posterView : {
		width: 70,
		height: 70,
		marginRight: 10
	},
  headerText: {
    fontSize: 16,
		marginLeft: 0,
		marginRight: 50,
    color: '#0781d4',
    textAlign: 'left'
  },
  rowText: {
		marginLeft: 0,
    fontSize: 16,
    color: '#545454',
    textAlign: 'left'
  }
});
module.exports = MovieItem;
