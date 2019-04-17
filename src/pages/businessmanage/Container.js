import React, { Component } from 'react';
import update from 'react/lib/update';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';

const style = {
  marginTop:"20px",
};

@DragDropContext(HTML5Backend)
export default class Container extends Component {
  constructor(props) {
    super(props);
    this.moveCard = this.moveCard.bind(this);
   /* this.state = {
      cards: [{
        id: 1,
        text: 'Write a cool JS library',
      }, {
        id: 2,
        text: 'Make it generic enough',
      }, {
        id: 3,
        text: 'Write README',
      }, {
        id: 4,
        text: 'Create some examples',
      }, {
        id: 5,
        text: 'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
      }, {
        id: 6,
        text: '???',
      }, {
        id: 7,
        text: 'PROFIT',
      }],
    };*/
    this.state={
      dragable:false
    }
    
  }
  componentWillMount(){
    this.state={cards:this.props.data};
    console.log(this.props.data);
  }
  componentWillReceiveProps(nextProps) {
      
      console.log(nextProps);
      this.setState({cards:nextProps.data,dragable:nextProps.dragable})
  }
 /* componentDidUpdate(){
    if(this.state.ee == this.props.data &&this.state.ee){
      console.log("不切换")
    }else{
      this.setState({ee:this.props.data});
      console.log("切换")
    }
  }*/

  moveCard(dragIndex, hoverIndex) {
    const { cards } = this.state;
    console.log(dragIndex)
    const dragCard = cards[dragIndex];
    if(!this.state.dragable){
      return
    }

    this.setState(update(this.state, {
      cards: {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      },
    }));
    console.log(this.state.cards);
    this.props.setGunDong1(this.state.cards);
  }

  render() {
    const { cards } = this.state;
    return (
      <div style={style} key={this.props.key} className={this.props.className} data={this.props.data}>
        {cards.map((card, i) => (
          <Card
            key={card.id}
            index={i}
            id={card.id}
            text={card.name}
            moveCard={this.moveCard}
          />
        ))}
      </div>
    );
  }
}
