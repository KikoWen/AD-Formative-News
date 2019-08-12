import React, {Component} from 'react';
import Article from './Article.jsx'
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';



import './App.css';

var keyCode = '757451de38ab48efb701b070446de0ad';
var key = '?apiKey=' + keyCode;

class App extends Component{
  constructor(props){
    super(props);
    this.state ={
      activeKey:'business',
      sportsArticles:[],
      businessArticles:[],
      politicsArticles:[],
      technologyArticles:[],
      keywordInput:'',
      othersArticles:[]
    }
  }

  loadHeadlinesByCategory = (category) =>{

    var articlesURL = 'https://newsapi.org/v2/top-headlines'+key+'&country=nz' + '&category=' + category; 
    fetch(articlesURL)
    .then(res => res.json())

    .then((data) =>{
      if(category == 'sports'){
        this.setState({sportsArticles:data.articles});
      }
      if(category == 'business'){
        this.setState({businessArticles:data.articles});
      }
      if(category == 'politics'){
        this.setState({politicsArticles:data.articles});
      }

      if(category == 'technology'){
        this.setState({technologyArticles:data.articles})
      }
      
    })

  }


  componentDidMount(){
    this.loadHeadlinesByCategory('business');
    this.loadHeadlinesByCategory('sports');
    this.loadHeadlinesByCategory('politics');
    this.loadHeadlinesByCategory('technology');
    this.loadHeadlinesByCategory('others')
  
  }

  loadHeadlinesByTerm = (term) => {
    var articlesURL = 'https://newsapi.org/v2/top-headlines'+key+'&q='+term;

    fetch(articlesURL)
    .then(res => res.json())
    .then((data)=>{
        var articles = data.articles;
        this.setState({othersArticles:data.articles})

    })

}

  handleSearchSubmitClick=(e)=>{
    e.preventDefault();
    var keywordInput = this.state.keywordInput;
    this.loadHeadlinesByTerm(keywordInput);
    this.setState({activeKey:'others'})


  }

  handleKeywordInputChange = (e) =>{
    this.setState({keywordInput:e.target.value})
    

  }

  handleTabSelect = (key,e) =>{
    this.setState({activeKey:key})
    

  }


  render(){
    return(
      <div className="container">
        <Tab.Container id="left-tabs-example" activeKey={this.state.activeKey} onSelect={this.handleTabSelect}>
  
        <div className="nav-container">
          <Nav fill variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
              <Nav.Link eventKey="business">Business</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="politics">Politics</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="sports">Sports</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="technology" >Technology</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="others" >Others</Nav.Link>
            </Nav.Item>
          </Nav>

          <Form>
            <Form.Group controlId="formBasicPassword">
              <Form.Control type="text" onChange={this.handleKeywordInputChange} placeholder="Enter keywords" />
            </Form.Group>
            <Button variant="primary" type="submit" className='search' onClick ={this.handleSearchSubmitClick}>
              Search
            </Button>
          </Form>


          </div>

          <Tab.Content>
            <Tab.Pane eventKey="business">
              {
               this.state.businessArticles.map((article)=>{
                
                var articleProps = {
                  ...article,
                };
                return <Article {...articleProps} />;
               })
              }
              
              
            </Tab.Pane>
            <Tab.Pane eventKey="politics">
              {
                this.state.politicsArticles.map((article)=>{
                  var articleProps = {
                    ...article,
                  };
                  return <Article {...articleProps}/>;
                })
              }
              
            </Tab.Pane>
            <Tab.Pane eventKey="sports">
              {
               this.state.sportsArticles.map((article)=>{
                
                var articleProps = {
                  ...article,
                };
                return <Article {...articleProps} />;
               })
              }
            
            </Tab.Pane>
            <Tab.Pane eventKey="technology">
                {
                this.state.technologyArticles.map((article)=>{
                  
                  var articleProps = {
                    ...article,
                  };
                  return <Article {...articleProps} />;
                })
                }
             
            </Tab.Pane>

            <Tab.Pane eventKey="others">
                {
                this.state.othersArticles.map((article)=>{
                  
                  var articleProps = {
                    ...article,
                  };
                  return <Article {...articleProps} />;
                })
                }
             
            </Tab.Pane>
          </Tab.Content>
      
        </Tab.Container>

      </div>

    )
  }
}

export default App;
