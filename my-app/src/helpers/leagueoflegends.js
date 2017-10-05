var leagueprofile = {
                    summonerName: null,
                    accountId: null,
                    summonerId: null,
                    summonerLevel: null,
                    tier: null,
                    rank: null,
                    wins: null,
                    losses: null,
                    matches: null
                }

export default window.leagueprofile = {
    
        getSummoner() {
                fetch('https://br1.api.riotgames.com/lol/summoner/v3/summoners/by-name/coltshot?api_key=RGAPI-e3afb9fd-41f4-49f7-9b04-3aa715d76b4f')
                    .then(lolrequest => lolrequest.json())
                    .then(lolrequest => {
                        this.setState({
                            summonerName : lolrequest.name,
                            summonerId   : lolrequest.id,
                            accountId    : lolrequest.accountId,
                            summonerLevel: lolrequest.summonerLevel
                        })
                    })
            }

        getRank() {
            fetch('https://br1.api.riotgames.com/lol/league/v3/positions/by-summoner/647588?api_key=RGAPI-e3afb9fd-41f4-49f7-9b04-3aa715d76b4f')
                .then(lolrequest => lolrequest.json())
                .then(lolrequest => {
                    this.setState({
                        tier   : lolrequest[0].tier,
                        rank   : lolrequest[0].rank,
                        wins   : lolrequest[0].wins,
                        losses : lolrequest[0].losses
                    })
                })
        }

        getMatchHistory() {
            fetch('https://br1.api.riotgames.com/lol/match/v3/matchlists/by-account/663093/recent?api_key=RGAPI-e3afb9fd-41f4-49f7-9b04-3aa715d76b4f')
            .then(lolrequest => lolrequest.json())
            .then(lolrequest => {
                this.setState({
                    matches : lolrequest.matches[0].lane
                })
            })
        }