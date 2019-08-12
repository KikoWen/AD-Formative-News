import React, {Component} from 'react';

class Article extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div>
                <h5>{this.props.title}</h5>
                <p className='time'>{this.props.publishedAt}</p>
                <h6> {this.props.description}</h6>
                <p>{this.props.content}</p>
                <img src={this.props.urlToImage}/>
   
            </div>
        )
    }
}

export default Article;