import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
	StyleSheet
} from 'react-native';

import Spinner from 'react-native-loading-spinner-overlay';
import MovieItem from './MovieItem';

class MovieDetails extends Component {
	constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
      movieDetails: {},
      ratings: []
    };
  }

  componentDidMount() {
    this.getMovieDetails();
  };

  componentWillUnmount() {
  };

  getMovieDetails = () => {
    this.setState({
      showLoader: true
    });

    fetch('https://www.omdbapi.com/?i='+this.props.passProps.imdbID, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.json())
    .then((responseData) => {
      this.setState({
        movieDetails: responseData,
        ratings: responseData.Ratings,
        showLoader: false
      });
    })
    .catch(error => { console.log('request failed', error); })
    .done(() => {
      this.setState({
        showLoader: false
      });
    });
  };

	render() {
    var posterView = this.state.movieDetails.Poster == 'N/A' ?  <Image style={styles.posterView} source={require('./../images/noimage.png')} />:<Image style={styles.posterView} source={{uri: this.state.movieDetails.Poster}} />
    return (
			<View style={styles.container}>
        <Spinner visible={this.state.showLoader} ColorProp='rgba(0,0,0,1)' />
        <ScrollView style={styles.subView}>
          <View style={styles.rowView}>
            { posterView }
            <View>
              <Text style={styles.headerText}>{this.state.movieDetails.Title}</Text>
              <Text style={styles.headerText}>{this.state.movieDetails.Year}</Text>
              <Text style={styles.headerText}>{this.state.movieDetails.Rated}</Text>
              <Text style={styles.headerText}>{this.state.movieDetails.Released}</Text>
              <Text style={styles.headerText}>{this.state.movieDetails.Runtime}</Text>
            </View>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.headerText}>imdbRating : </Text>
            <Text style={styles.rowText}>{this.state.movieDetails.imdbRating}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.headerText}>imdbVotes : </Text>
            <Text style={styles.rowText}>{this.state.movieDetails.imdbVotes}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.headerText}>Ratings : </Text>
          </View>
          {
            this.state.ratings.map(rating => {
              return <View key={rating.Source} style={styles.rowView}><Text style={styles.rowText}>{rating.Source} : {rating.Value}</Text></View>
            })
          }
          <View style={styles.rowView}>
            <Text style={styles.headerText}>Director : </Text>
            <Text style={styles.rowText}>{this.state.movieDetails.Director}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.headerText}>Actors : </Text>
            <Text style={styles.rowText}>{this.state.movieDetails.Actors}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.headerText}>Writer : </Text>
            <Text style={styles.rowText}>{this.state.movieDetails.Writer}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.headerText}>Language : </Text>
            <Text style={styles.rowText}>{this.state.movieDetails.Language}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.headerText}>Country : </Text>
            <Text style={styles.rowText}>{this.state.movieDetails.Country}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.headerText}>Awards : </Text>
            <Text style={styles.rowText}>{this.state.movieDetails.Awards}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.headerText}>Metascore : </Text>
            <Text style={styles.rowText}>{this.state.movieDetails.Metascore}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.headerText}>BoxOffice : </Text>
            <Text style={styles.rowText}>{this.state.movieDetails.BoxOffice}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.headerText}>Production : </Text>
            <Text style={styles.rowText}>{this.state.movieDetails.Production}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.headerText}>Website : </Text>
            <Text style={styles.rowText}>{this.state.movieDetails.Website}</Text>
          </View>
          <View style={styles.rowView}>
            <Text style={styles.headerText}>Plot : </Text>
            <Text style={styles.rowText}>{this.state.movieDetails.Plot}</Text>
          </View>
        </ScrollView>
  	  </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
    flex: 1,
    paddingTop: 65,
    flexDirection: 'column',
    backgroundColor: '#DCDCDC',
  },
  subView: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
    backgroundColor: '#F0F0F0',
  },
  rowView: {
		marginTop: 10,
    marginLeft: 10,
		marginRight: 10,
		flexDirection:'row'
  },
	posterView : {
		width: 100,
		height: 150,
		marginRight: 10
	},
  headerText: {
    fontSize: 16,
		marginLeft: 0,
		color: '#0781d4',
    textAlign: 'left'
  },
  rowText: {
		marginLeft: 0,
    marginRight: 50,
    fontSize: 16,
    color: '#545454',
    textAlign: 'left'
  }
});
module.exports = MovieDetails;
