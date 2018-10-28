import React from 'react';
import { Segment, Button, Input} from 'semantic-ui-react';


class MessageForm extends React.Component {
    render(){
        console.log('asdfas');
        return(
            <Segment className="message__form">
                <Input
                    fluid
                    name="message"
                    style={{marginBottom: 'o.7em'}}
                    lable={<Button icon={'add'}></Button>}
                    labelPosition="left"
                    placeholder="Write your message"


                ></Input>

                <Button.Group icon width="2">
                    <Button 
                        color="orange"
                        content="Add Reply"
                        labelPositon="left"
                        icon="eidt"
                    />

                    <Button 
                        color="teal"
                        content="Upload Media"
                        labelPosition="right"
                        icon="cloud upload"
                    />

                
                </Button.Group>
            
            
            </Segment>



        )

    }

}



export default MessageForm;