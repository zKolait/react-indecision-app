// Imports
import React from 'react'

// Components
import AddOption from './AddOption.js'
import Options from './Options.js'
import Header from './Header.js'
import Action from './Action.js'
import OptionModal from './OptionModal.js'



// Statefull functional component
export default class IndecisionApp extends React.Component {
    state = {
        options: this.props.options,
        selectedOption: undefined
    }


    // Component mounted to view
    componentDidMount = () => {
        try {
            const json = localStorage.getItem('options')
            const options = JSON.parse(json)

            if (options) {
                this.setState(() => ({ options }))
            }
        } catch (e) {}
    }
    // Component has updated
    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options)
            localStorage.setItem('options', json)
        }
    }
    // Component will unmount
    componentWillUnmount = () => {
        console.log('App Unmounted !')
    }


    // Delete all options method
    handleDeleteOptions = () => {
        this.setState(() => ({ options: [] }))
    }

    // Delete a specific option method
    handleDeleteOption = (option) => {
        this.setState((prevState) => ({
            options: prevState.options.filter((optionValue) => (optionValue !== option))
        }))
    }

    // Pick a random option method
    handlePick = () => {
        let pickNumber = Math.floor(Math.random() * this.state.options.length)
        let option = this.state.options[pickNumber]

        this.setState(() => ({ selectedOption: option }))
    }

    // Close modal
    handleCloseModal = () => {
        this.setState(() => ({ selectedOption: undefined }))
    }

    // Add an option method
    handleAddOption = (option) => {
        if (!option) {
            return 'Enter a valid value to add item'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option already exists'
        }

        this.setState((prevState) => ({ options: prevState.options.concat(option) }) )
    }

    // Render app
    render() {
        return (
            <div>
                <Header 
                    title={this.props.title} 
                    subtitle={this.props.subtitle} 
                />
                <div className="container">
                    <Action 
                        hasOptions={this.state.options.length > 0} 
                        handlePick={this.handlePick} 
                    />
                    <div class="widget">
                        <Options 
                            options={this.state.options}
                            handleDeleteOptions={this.handleDeleteOptions}
                            handleDeleteOption={this.handleDeleteOption}
                        />
                        <AddOption 
                            handleAddOption={this.handleAddOption}
                        />
                    </div>
                </div>
                <OptionModal selectedOption={this.state.selectedOption} handleCloseModal={this.handleCloseModal} />
            </div>
        )
    }
}
// Default values for main app
IndecisionApp.defaultProps = {
    options: [],
    title: 'Indecision',
    subtitle: 'The computer will choose for you'
}