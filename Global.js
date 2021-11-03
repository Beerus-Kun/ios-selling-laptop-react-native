import AsyncStorage from "@react-native-async-storage/async-storage";

var global = {};

global.url = 'https://goodlaptop.herokuapp.com';
global.token = '';
global.name = '';
global.email = '';
global.address = '';
global.status = '';
global.isLog = false;

global.init = async () => {
    try {
        let isLog = await AsyncStorage.getItem("isSignin");

        if (isLog && isLog == 'true') {
            let token = await AsyncStorage.getItem("token");
            global.token = token;
            await fetch(`${global.url}/account/information`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${global.token}`
                }
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    // console.log(responseJson);
                    global.name = responseJson.data.name;
                    global.email = responseJson.data.email;
                    global.address = responseJson.data.address;
                    global.status = responseJson.data.status;
                    global.isLog = true;
                })
                .catch((err) => {

                    global.token = '';
                    global.name = '';
                    global.email = '';
                    global.address = '';
                    global.status = '';
                    global.isLog = false;
                });
        }

    } catch (err) {
        console.log(err);
    }
}

global.signOut = () => {
    try {
        global.setIsSignin('false');
        global.setToken('');
        global.token = '';
        global.name = '';
        global.email = '';
        global.address = '';
        global.status = '';
        global.isLog = false;
    } catch (err) {
        console.log(err)
    }
}

global.setToken = async (new_token) => {
    try {
        await AsyncStorage.setItem("token", new_token);
        global.token = new_token;
    } catch (e) {
        console.log(e);
    }
}

global.setIsSignin = async (isSignin) => {
    try {
        await AsyncStorage.setItem("isSignin", isSignin);
        global.isLog = (isSignin == 'true')
    } catch (e) {
        console.log(e);
    }
}

global.currencyFormat = (num) => {
    num = Number(num);
    var money = num.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return money + ' VND';
}

module.exports = global;