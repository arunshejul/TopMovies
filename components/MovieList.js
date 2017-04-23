import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Platform,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import MovieItem from './MovieItem';
import Store from '../app/store/Store';
import { fetchMovies } from '../app/actions/index';
import Spinner from 'react-native-loading-spinner-overlay';

class MovieList extends Component {

  constructor() {
    super();

    this.state = {
      movieName: 'iron man',
      isLoading: false,
      showLoader: false,
      status: '',
      movies: []
    };
  }

  componentDidMount() {
    Store.subscribe(() => {
      this.setState({
        movies: Store.getState().movies.items
      });
    });

    this.handleSearchResult();

  };

  componentWillUnmount() {

  };

  handleSearchResult = () => {
    if (!this.state.movieName) {
      this.setState({
        isLoading: false,
        movies: []
      });
      return alert('Please enter a valid movie name, Try again');
    } else if (this.state.movieName.length >= 3) {
      this.setState({
        showLoader: true
      });
      Store.dispatch(fetchMovies(this.state.movieName));

      setTimeout(() => {
        this.setState({
          showLoader: false
        });
      },500);
    }
  };

  render() {
    return (
        <View style={styles.container}>
          <Spinner visible={this.state.showLoader} ColorProp='rgba(0,0,0,1)' />
          <View style={styles.textView}>
            <TextInput
              value={this.state.movieName}
              style={styles.textInputView}
              onSubmitEditing={this.handleSearchResult}
              returnKeyType = 'search'
              clearButtonMode='while-editing'
              placeholderTextColor='#D3D3D3'
              placeholder='Enter movie name'
              onChangeText={(movieName) => this.setState({movieName})}
            >
            </TextInput>
            {Platform.OS === 'android'?
              <TouchableOpacity style={styles.searchButton} underlayColor="#ffffff" onPress={()=>{this.setState({movieName: ''}); }}>
                {this.state.movieName.length > 0?
                  <Image style={styles.searchImage} source={require('./../images/crossIcon.png')} />:null
                }
              </TouchableOpacity>: null
            }
          </View>
          <ScrollView style={styles.subView}>
            {
              this.state.movies.map(movie => {
                return <MovieItem navigator={this.props.navigator} key={movie.imdbID} imdbID= {movie.imdbID} title={movie.Title} year={movie.Year} poster={movie.Poster} type={movie.Type} />
              })
            }
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
    backgroundColor: '#F0F0F0',
  },
  textView: {
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#DCDCDC',
    backgroundColor: '#ffffff',
    flexDirection: 'row',
  },
  textInputView: {
    flex: 2,
    height: 50,
    fontSize: 16,
    paddingLeft: 20,
    paddingRight: 20,
    color:'#545454',
    textAlign: 'left'
  },
  searchImage: {
    width: 20,
    height: 20
  },
  searchButton: {
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center'
  },
  subView: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: '#F0F0F0',
  }
});

export default MovieList;
