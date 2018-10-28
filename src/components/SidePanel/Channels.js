import React from 'react'
import firebase from '../../firebase';
import { Menu, Icon, Modal, Form, Input, Button } from 'semantic-ui-react';

// Add Redux
import { connect } from 'react-redux';
// Bring Action
import { setCurrentChannel } from '../../actions';






class Channels extends React.Component {

    state = {
        activeChannel: '',
        user: this.props.currentUser,
        channels: [],
        channelName: '',
        channelDetails: '',
        channelsRef: firebase.database().ref('channels'),
        modal: false,
        firstLoad: true,
    }

    // submit channel to firebase
    handleSubmit = event => {
        event.preventDefault();

        if(this.isFormValid(this.state)){
            // firebase connect
            this.addChannel();
        }
    }

    
    addChannel = () => {
        const {channelsRef, channelName, channelDetails, user} = this.state;

        const key = channelsRef.push().key;

        console.log('this is key ' + key);



        console.log(channelsRef);

        const newChannel = {
            id: key,
            name: channelName,
            details: channelDetails,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        }

        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                this.setState({channelName: '', channelDetails: ''});
                this.closeModal();
                console.log('channel added');
            })
            .catch(err => {
                console.error(err);
            })

    }

    // validate if input has name and detail
    isFormValid = ({channelName, channelDetails}) => channelName && channelDetails;

    handleChange = (event) => ( this.setState({[event.target.name]: event.target.value}));
    closeModal = () => this.setState({modal: false});
    openModal = () => this.setState({modal: true});



    // REDUX change channel data
    changeChannel = channel => {
        // active channel
        this.setActiveChannel(channel);
        this.props.setCurrentChannel(channel);
    }

    // active channel
    setActiveChannel = channel => {
        this.setState({ activeChannel: channel.id});

    }



    //  Find all the list of channel from data base
    componentDidMount(){
        this.addListeners();
    }

    componentWillUnmount(){
        this.removeListeners();
 
    }

    removeListeners = () => {
        console.log('last');
        this.state.channelsRef.off();

    }



    


    // Get Channels data from fire base 

    addListeners = () => {
        let loadedChannels = [];
        this.state.channelsRef.on('child_added', snap => {
            loadedChannels.push(snap.val());
            console.log(loadedChannels);

            this.setState({ channels: loadedChannels }, () => this.setFirstChannel());
        })
    };

    // Loading First channel 
    setFirstChannel = () => {
        const firstChannel = this.state.channels[0];
        if(this.state.firstLoad && this.state.channels.length > 0){
            this.props.setCurrentChannel(firstChannel);
            this.setActiveChannel(firstChannel);
        }

        this.setState({firstLoad: false});

    }
    
    
    displayChannels = channels => (
        channels.length > 0 && channels.map(channel => (
            <Menu.Item
                key={channel.id}
                onClick={() => this.changeChannel(channel)}
                name={channel.name}
                style={{ opacity: 0.7}}
                active={channel.id === this.state.activeChannel}
            ># {channel.name}
            </Menu.Item>

        ))
    );

    
 
    render(){
        const { channels, modal } = this.state;


        return(

            <React.Fragment>
            <Menu.Menu style={{paddingBottom: '2em'}}>
                <Menu.Item>
                    <span>
                        <Icon name="exchange" /> CHANNELS
                    </span> {" "}

                    ({channels.length}) <Icon name="add" onClick={this.openModal} />

                
                </Menu.Item>
            
                { /* Channels */}
                {this.displayChannels(channels)}

            </Menu.Menu>

            <Modal basic open={modal} onClose={this.closeModal}>
                <Modal.Header>Add a Channel</Modal.Header>
                <Modal.Content>
                    <Form onSubmit={this.handleSubmit}> 
                        {/* Channel Name */}
                        <Form.Field>
                            <Input 
                                fluid
                                label="Name of Channel"
                                name="channelName"
                                onChange={this.handleChange}>
                            </Input>
                        </Form.Field>

                        {/* Channel Detail */}
                        <Form.Field>
                            <Input 
                                fluid
                                label="About the Channel"
                                name="channelDetails"
                                onChange={this.handleChange}>
                            </Input>
                        </Form.Field>
                    </Form>
                </Modal.Content>
                <Modal.Actions>
                    <Button color="green" inverted onClick={this.handleSubmit}>
                        <Icon name="checkmark" /> Add
                    </Button>
                    <Button color="red" inverted onClick={this.closeModal}>
                        <Icon name="remove" /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>

            </React.Fragment>

        );
    }
}


export default connect(null, {setCurrentChannel})(Channels);
