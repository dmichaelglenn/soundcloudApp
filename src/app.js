import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ProgressSoundPlayer from './components/ProgressSoundPlayer';
import SC from 'node-soundcloud';
import Loading from 'react-loading';
import autobind from 'autobind-decorator';

var client_id = 'APP ID WILL GO HERE WHEN I GET IT';

SC.init({
    id: client_id
});

@autobind
class Main extends Component {
    constructor(props){
        super();

        this.state = {
            query: '',
            hasResults: false,
            searchResults: [],
            isLoading: false
        }
    }

    handleTextChange(event) {
        this.setState({
            query: event.target.value
        });
        if (event.key === 'Enter') {
            this.search.call(this);
        }
     }
    
    search() {
        this.setState({
            isLoading: true
        });
        SC.get('/tracks', {
            q: this.state.query,
            embeddable_by: 'all'
        }, (err, tracks) => {
            if (!err) {
                this.setState({
                    hasResults: true,
                    searchResults: tracls,
                    isLoading: false
                });
            }
        });
    }

    renderNoSearchResults() {
        return (
            <div id="no-results"></div>
        );
    }

    renderSearchResults() {
        return (
            <div id="search-results">
                {this.state.searchResults.map(this.renderPlayer)}
            </div>
        );
    }



    render() {
        return (
            <div>
                <h1>Soundcloud Desktop Player</h1>
                <input type="search"
                    onKeyUp={this.handleTextChange}
                    className='search-field'
                    placeholder="Enter song/artist to search" />
                <button className="search-button"
                    onClick={this.search}>Search</button>
                <div className="center">
                    {this.state.isLoading && <Loading type="bars" color="#FFBB935" />}
                </div>
                {this.state.hasResults && !this.state.isLoading ?
                  this.renderSearchResults :
                 this.renderNoSearchResults}
            </div>
        );
    }
}