import React, {Component} from 'react';

class Article extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <h5>{this.props.title}</h5>
                <p> {this.props.description}</p>
                <img src={this.props.source.urlToImage}/>

                
            </div>
        )
    }
}

export default Article;