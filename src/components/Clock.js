import TikTak from "./TikTak.js"
import { Component } from "react";

class Clock extends Component {

    state = {
        time: (new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000) + (3600000*this.props.zone))).toLocaleTimeString()
    }

    del = () =>  {
        clearInterval(this.timerId)
    }

    componentDidMount() {

        this.timerId = setInterval(() => {
            this.setState(preState => ({ time: (new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000) + (3600000*this.props.zone))).toLocaleTimeString() }))
        }, 1000)
    }

    // React.useEffiet(() => {
    //     timerId = setInterval(()=> {
    //       setTime(prev => ({time: ....}))
    //     }, 1000) 
    // }, []) 

    componentWillUnmount() {
        clearInterval(this.timerId)
    }
    
    render() {  
        return(
            <div className="clock">
                <div className="clockHeader">
                    <h3>{this.props.name}</h3>
                    <div className="cross" onClick={(event) => this.props.deleteClock(event, this.props.id)}>x</div>
                </div>
                <h3>{this.state.time}</h3>
                <TikTak time={this.state.time}/>
            </div>
        )
    }
}

export default Clock


        //time: new Date().toLocaleTimeString()

        // const d = new Date()
        // const utc = d.getTime() - (d.getTimezoneOffset() * 60000)
        // const nd = new Date(utc + (3600000*0)) //  где 0 - timeZone
        // nd.toLocaleString()
