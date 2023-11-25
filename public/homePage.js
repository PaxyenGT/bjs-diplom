"use strict";

const logoutButton = new LogoutButton()

logoutButton.action = function letLogOut() {
	ApiConnector.logout(response => {
		if (response) {
			location.reload()
		}
	})
}

ApiConnector.current(profile => {
	if (profile.data) {
		ProfileWidget.showProfile(profile.data)
	}
})

const ratesBoard = new RatesBoard()
burds()

function burds() {
	ApiConnector.getStocks(boards => {
		if (boards.data) {
			ratesBoard.clearTable(boards.data)
		}
		ratesBoard.fillTable(boards.data)
	})
}
setInterval(burds, 60000)

const moneyManager = new MoneyManager()

moneyManager.addMoneyCallback = money => {
	ApiConnector.addMoney(money, balalceMoney => {
		if (balalceMoney.success) {
			ProfileWidget.showProfile(balalceMoney.data)
			moneyManager.setMessage(balalceMoney.success, "Вы пополнили кошелек")
		} else {
			moneyManager.setMessage(balalceMoney.success, balalceMoney.error)
		}
	})
}

moneyManager.conversionMoneyCallback = conver => {
	ApiConnector.convertMoney(conver, converMoney => {
		if (converMoney.success) {
			ProfileWidget.showProfile(converMoney.data)
			moneyManager.setMessage(converMoney.success, "Вы успешно конвертировали валюту!")
		} else {
			moneyManager.setMessage(converMoney.success, converMoney.error)
		}
	})
}

moneyManager.sendMoneyCallback = send => {
	ApiConnector.transferMoney(send, sendMoney => {
		if (sendMoney.success) {
			ProfileWidget.showProfile(sendMoney.data)
			moneyManager.setMessage(sendMoney.success, "Вы успешно сделали перевод!")
		} else {
			moneyManager.setMessage(sendMoney.success, sendMoney.error)
		}
	})
}

const favoritesWidget = new FavoritesWidget()

ApiConnector.getFavorites(favor => {
	console.log(favor)
	if (favor.success) {
		favoritesWidget.clearTable(favor.data)
		favoritesWidget.fillTable(favor.data)
		moneyManager.updateUsersList(favor.data)
	}

})

favoritesWidget.addUserCallback = addUser => {
	ApiConnector.addUserToFavorites(addUser, addUserFavorit => {
		if (addUserFavorit.success) {
			favoritesWidget.clearTable(addUserFavorit.data)
			favoritesWidget.fillTable(addUserFavorit.data)
			moneyManager.updateUsersList(addUserFavorit.data)
			favoritesWidget.setMessage(addUserFavorit.success, "Пользователь добавлен в адресную книгу!")
		} else {
			favoritesWidget.setMessage(addUserFavorit.success, addUserFavorit.error)
		}
	})
}

favoritesWidget.removeUserCallback = removeUser => {
	ApiConnector.removeUserFromFavorites(removeUser, removeUserFavorit => {
		if (removeUserFavorit.success) {
			favoritesWidget.clearTable(removeUserFavorit.data)
			favoritesWidget.fillTable(removeUserFavorit.data)
			moneyManager.updateUsersList(removeUserFavorit.data)
			favoritesWidget.setMessage(removeUserFavorit.success, "Пользователь удален из адресной книги!")
		} else {
			favoritesWidget.setMessage(removeUserFavorit.success, removeUserFavorit.error)
		}
	})
}