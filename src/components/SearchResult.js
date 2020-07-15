import React from 'react'
import Axios from 'axios'
import Movie from './Movie'

export default class SearchResult extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            results: []
        }
        this.peticionAPI = this.peticionAPI.bind(this)
    }

    componentDidUpdate() {
        this.peticionAPI()
    }

    async peticionAPI() {
        const query = this.props.search
        const queryBase = "https://api.themoviedb.org/3/search/movie?api_key=32f3a04caefdfe3f72de841ee31a3954&language=es&query="
        const completeQuery = queryBase.concat(query)
        const peticion = await Axios.get(completeQuery)
        this.setState({
            results: peticion.data.results
        })
    }

    render() {
        return (
            <div className="row">
                {
                    this.state.results.map(e =>
                        e.poster_path!==null ?  
                        <div style={{ height: '400px', margin: '20px' }} key={e.id}>
                            <Movie
                                title={e.title}
                                isPosterNull={e.poster_path}
                                poster={"https://image.tmdb.org/t/p/w500" + e.poster_path}
                                calificacion={e.vote_average}
                                id={e.id}
                            />
                        </div>
                        : <div key={e.id}></div>
                    )
                }
            </div>
        )
    }
}