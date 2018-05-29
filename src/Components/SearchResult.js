import React, { Component } from 'react';

class SearchResult extends Component {

    render() {

        const word = this.props.word
        const vale = this.props.value

        return(
            <div className="book">
                <div className="book-top">
                    {word} search: {vale}
                </div>
            </div>
        )
    }
}

export default SearchResult;