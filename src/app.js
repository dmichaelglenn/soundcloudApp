import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import ProgressSoundPlayer from './components/ProgressSoundPlayer';
import SC from 'node-soundcloud';
import Loading from 'react-loading';

var client_id = 'APP ID WILL GO HERE WHEN I GET IT';

SC.init({
    id: client_id
});

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
}