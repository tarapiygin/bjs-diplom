'use strtict'
//Получение курса валют с сервера
const ratersBoard = new RatesBoard();
function getStocks() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratersBoard.clearTable();
            ratersBoard.fillTable(response.data);
        };
    })
};
getStocks();
setInterval(getStocks, 60000);
//Выход из аккаунта
const logoutButton = new LogoutButton();
logoutButton.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            document.location.reload();
        };
    });
};

//Получение информации о пользователе
ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    };
});
//Работа с балансом пользователя
const moneyManager = new MoneyManager();
//Пополнение
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, 'Баланс успешно пополнен!');
        } else {
            moneyManager.setMessage(true, response.data);
        };
    });
};
//Конвертация
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, 'Конвертация выполнена успешно!');
        } else {
            moneyManager.setMessage(true, response.data);
        };
    });
};
//Перевод
moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(false, 'Перевод выполнен успешно!');
        } else {
            moneyManager.setMessage(true, response.data);
        };
    });
};

const favoritesWidget = new FavoritesWidget();
//Запрос начального списка избранного
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    };
});
//Добавление пользователя в список избранных
favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(false, 'Пользователь успешно добавлен!');
        } else {
            moneyManager.setMessage(true, response.data);
        };
    });
};
//Удаление пользователя из избранного
favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
            moneyManager.setMessage(false, 'Пользователь успешно удален!');
        } else {
            moneyManager.setMessage(true, response.data);
        };
    });
};