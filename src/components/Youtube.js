import React, {Component} from 'react';

const API = 'AIzaSyAvrVDzfee-kfatRWGwTlbOqRvOx2BvGXQ';
const URL = `https://www.googleapis.com/youtube/v3/search?key=${API}&part=snippet,id&order=date`
//&regionCode=GB&relevanceLanguage=EN

class Youtube extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value:'Vinod dua',
            resultyt: [],
            max: 10
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleNumChange = this.handleNumChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.clicked = this.clicked.bind(this);
    }
    componentDidMount() {
        this.clicked();
    }
     handleChange(event) {
        this.setState({value: event.target.value});

    }

     handleNumChange(event) {
        this.setState({max: event.target.value});

    }

    handleSubmit(event) {
        console.log('A name was submitted: ' + this.state.value);
        console.log('A max was submitted: ' + this.state.max);
        event.preventDefault();
        this.clicked();
    }
    
    
    clicked(){
        let finalURL = URL+`&maxResults=${this.state.max}&q=${this.state.value}`;
        fetch(finalURL)
        .then((response) => response.json())
        .then((responseJson) => {
            //console.log(responseJson);
            const resultyt = responseJson.items.map(obj => 
                ({'link':"https://www.youtube.com/embed/" + obj.id.videoId,
                title:obj.snippet.title})
            );
            this.setState({resultyt});
            
        })
        .catch((error) => {
            console.error(error);
        });
    }
    render() {
        //console.log(finalURL);
        //console.log(this.state.resultyt);
        return(
            <div className="outer-div">
                
                     <form onSubmit={this.handleSubmit}>
                    <label className="lbl">
                    Search:</label>
                    <input type="text" className="iput" value={this.state.value} onChange={this.handleChange} />
                    <input type="text" className="iput num" value={this.state.max} onChange={this.handleNumChange} />
                    <input type="submit" className="button" value="Submit" />
                </form>
                
                {
                    this.state.resultyt.map((obj, i) => {
                        var frame = <div key={i} className="youtube"><iframe width="560" height="315" src={obj.link} title={obj.title} frameBorder="0" allowFullScreen></iframe></div>
                        return frame;
                    })
                }
                {this.frame}
            </div>
        );
    }
}



export default Youtube;