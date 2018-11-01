import React from 'react';
import mime from 'mime-types';
import { Icon, Modal, Input, Button } from 'semantic-ui-react';

class FileModal extends React.Component {
    state = {
        file: null,
        authorized: ['image/jpeg', 'image/png']
    }


    // onChange File
    addedFile = event => {
        const file = event.target.files[0];

        if(file){
            this.setState({file});

        }
    };

    
    sendFile = () => {
        const {file} = this.state;
        const { uploadFile, closeModal } = this.props;

        if(file !== null){
            if(this.isAuthorized(file.name)){
                // send file
                const metadata = {contentType: mime.lookup(file.name)};
                uploadFile(file, metadata);
                closeModal();
                this.clearFile();
            }

        }
    }

    isAuthorized = fileName => this.state.authorized.includes(mime.lookup(fileName));

    clearFile = () => this.setState({file: null});

    render(){
        const {modal, closeModal} = this.props;



        return (
            <Modal basic open={modal} onClose={this.closeModal}>
                <Modal.Header>Select and Image File</Modal.Header>

                <Modal.Content>
                    <Input 
                        onChange={this.addedFile}
                        fluid
                        lable="File type: jpg, png"
                        name="file"
                        type="file"
                        />
                </Modal.Content>

                <Modal.Actions>
                    <Button
                        onClick={this.sendFile}
                        color="green"
                        inverted
                    >
                        <Icon name="checkmark"/> Send
                    </Button>

                    <Button
                    color="red"
                    inverted
                    onClick={closeModal}
                    >
                        <Icon name="checkmark"/> Cancel
                    </Button>


                </Modal.Actions>
            </Modal>
        );
    }
}


export default FileModal;
