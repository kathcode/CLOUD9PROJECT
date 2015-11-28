const React = require('react')
const xhr = require('xhr')
const container = document.querySelector('#container')

const Profile = React.createClass({
    render: function () {
        return (
            <div className="profile">
                <h2>{this.props.name}</h2>
                <img src={this.props.avatar} />
                <p>{this.props.children}</p>
            </div>
        )
    }
})

const Profiles = React.createClass({
    getInitialState: function () {
        return {
            profiles: []
        }
    },
    componentDidMount: function () {
        var self = this
        
        xhr({
          url: '/profiles.json',
          responseType: 'json'
        }, function (err, res, body) {
            if (err) return
            
            self.setState({
                profiles: body
            })
        })    
    },
    render: function () {
        var profiles = this.state.profiles
        return (
            <div>
                {profiles.map(function (p) {
                    return <Profile key={p.username} name={p.name} avatar={p.avatar}>{p.bio}</Profile>
                })}
            </div>
        )
    }
})

const App = React.createClass({
    render: function () {
        return (
            <Profiles />
        )
    }
})


React.render(<App />, container)




// JSX 

// <App>
//   <Profile name="Xiomara" avatar="http://...">
//      Desarrolladora de Cognox, futura Sr Frontend en X Empresa
//   </Pofile>
// </App>