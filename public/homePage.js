"use strict";

const logoutButton = new LogoutButton()

logoutButton.action = function letLogOut() {
    ApiConnector.logout(response => {
        if(response) {
            location.reload()
        }
    })
}

ApiConnector.current(profile => {
    if(profile.data) {
        ProfileWidget.showProfile(profile.data)
    }
})

const ratesBoard = new RatesBoard()
burds()
function burds() {
    ApiConnector.getStocks(boards => {
        if(boards.data) {
        ratesBoard.clearTable(boards.data) 
    }
    ratesBoard.fillTable(boards.data)
    })
}
setInterval(burds, 60000)

const moneyManager = new MoneyManager()

moneyManager.addMoneyCallback = money => {
    ApiConnector.addMoney(money, balalceMoney => {
        if(balalceMoney.success) {
                ProfileWidget.showProfile(balalceMoney.data)  
                moneyManager.setMessage() // проблема возникла с окном вывода сообщения
        } 
    })
}

moneyManager.conversionMoneyCallback = conver => {
    ApiConnector.convertMoney(conver, converMoney => {
        if(converMoney.success) {
                ProfileWidget.showProfile(converMoney.data) 
                moneyManager.setMessage()  // проблема возникла с окном вывода сообщения   
        }   
    })
}

moneyManager.sendMoneyCallback = send => {
    ApiConnector.transferMoney(send, sendMoney => {
        if(sendMoney.success) {
                ProfileWidget.showProfile(sendMoney.data) 
                moneyManager.setMessage() // проблема возникла с окном вывода сообщения     
        }   
    })
}

const favoritesWidget = new FavoritesWidget()

ApiConnector.getFavorites(favor => {
    console.log(favor)
    if(favor.success) {
        favoritesWidget.clearTable(favor.data)
        favoritesWidget.fillTable(favor.data)
        moneyManager.updateUsersList(favor.data) 
    }

})

favoritesWidget.addUserCallback = addUser => {
    ApiConnector.addUserToFavorites(addUser, addUserFavorit => {
        if(addUserFavorit.success) {
            favoritesWidget.clearTable(addUserFavorit.data)
            favoritesWidget.fillTable(addUserFavorit.data)
            moneyManager.updateUsersList(addUserFavorit.data) 
            moneyManager.setMessage(addUser) // проблема возникла с окном вывода сообщения
        }       
    })       
}

favoritesWidget.removeUserCallback = removeUser => {
    ApiConnector.removeUserFromFavorites(removeUser, removeUserFavorit => {
        if(removeUserFavorit.success) {
            favoritesWidget.clearTable(removeUserFavorit.data)
            favoritesWidget.fillTable(removeUserFavorit.data)
            moneyManager.updateUsersList(removeUserFavorit.data) 
            moneyManager.setMessage() // проблема возникла с окном вывода сообщения
        }
    })
}