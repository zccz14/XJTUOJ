import React, {Component} from "react";
import {Card, CardTitle, CardText} from "material-ui/Card";
import CircularProgress from "material-ui/CircularProgress";
import {RadioButtonGroup, RadioButton} from "material-ui/RadioButton";

class ProblemCard extends Component {
  state = {
    expanded: false
  };

  getContent = (data) => {
    return (
      <div>
        {data.description}
        {
          data.type === 'MULTIPLE_CHOICE_SINGLE_ANSWER' ?
            <RadioButtonGroup name="">
              {
                data.addons.map((v, i) => (
                  <RadioButton label={v} key={i} value={i}/>
                ))
              }
            </RadioButtonGroup>
            : null
        }
      </div>
    );
  };

  render() {
    const {data} = this.props;
    return (
      <Card
        style={{
          margin: 15
        }}
        expanded={this.state.expanded}
        onExpandChange={(expanded) => {
          this.setState({expanded});
          if (expanded && data.description === null) {
            this.props.onLoading(this.props.problemId);
          }
        }}
      >
        <CardTitle
          title={this.props.data.title}
          subtitle={this.props.data.type}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <CardText expandable={true}>
          {
            data.description ?
              this.getContent(data) :
              <CircularProgress
                size={60}
                thickness={3}
                style={{
                  margin: '0 auto',
                  display: 'block'
                }}
                color="#FF9800"
              />
          }
        </CardText>
      </Card>
    )
  }
}

export default ProblemCard;