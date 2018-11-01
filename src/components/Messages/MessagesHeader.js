import React from 'react';
import { Header, Segment, Input, Icon } from 'semantic-ui-react';


class MessageHeader extends React.Component{

    

    render(){

        const { channelName, numUniqueUsers, handleSearchChange, searchLoading } = this.props;




        return (
            <Segment clearing>
                {/* Channel Titile */}
                <Header fluid="true" as="h2" floated="left" style={{marginBottom: 0}}>
                    <span>

                    {channelName}
                    <Icon name={"star outline"} color="black"></Icon>
                    
                    </span>
                
                    <Header.Subheader>{numUniqueUsers}</Header.Subheader>

                </Header>


                { /* Channel Search Input */}
                <Header floated="right">
                    <Input
                        loading={searchLoading} 
                        onChange={handleSearchChange}
                        size="mini"
                        icon="search"
                        name="searchTerm"
                        placeholder="Search Messages"
                    
                    ></Input>


                
                
                
                </Header>



            
            
            
            </Segment>

        )

    }

}


export default MessageHeader;